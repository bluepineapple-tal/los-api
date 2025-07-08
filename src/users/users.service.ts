import { ConsumerDetails } from 'src/users/consumer.entity';
import { VendorDetails } from 'src/users/vendor.entity';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { User } from './user.entity';
import { UserRole } from './user.enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(VendorDetails)
    private readonly vendorRepo: Repository<VendorDetails>,

    @InjectRepository(ConsumerDetails)
    private readonly consumerRepo: Repository<ConsumerDetails>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find({
      relations: ['vendorProfile', 'consumerProfile'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['vendorProfile', 'consumerProfile'],
    });

    if (!user) throw new NotFoundException(`User "${id}" not found`);
    return user;
  }

  /**
   * Create a new user. If role is vendor, create a Vendor profile;
   * if role is consumer, create a Consumer profile.
   */
  async create(dto: CreateUserDto): Promise<User> {
    const {
      email,
      phone,
      first_name,
      last_name,
      role = UserRole.CONSUMER,
      supertokensUserId,
      /* vendor-specific */
      business_name,
      address,
      /* consumer-specific (optional) */
      ...consumerExtras
    } = dto;

    /* 1. base user ---------------------------------------------------- */
    const user = this.userRepo.create({
      email,
      phone,
      first_name,
      last_name,
      role,
      supertokensUserId,
    });

    // Save the new user
    const savedUser = await this.userRepo.save(user);

    /* 2. optional vendor profile ------------------------------------- */
    if (role === UserRole.VENDOR) {
      const vendor = this.vendorRepo.create({
        user: savedUser,
        business_name,
        address,
      });
      await this.vendorRepo.save(vendor);
    }

    /* 3. optional consumer profile ----------------------------------- */
    if (role === UserRole.CONSUMER) {
      const consumer = this.consumerRepo.create({
        user: savedUser,
        ...consumerExtras, // date_of_birth, gender, etc.
      });
      await this.consumerRepo.save(consumer);
    }

    return this.findOne(savedUser.id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    this.applyUserCoreUpdates(user, dto);
    await this.userRepo.save(user);

    switch (user.role) {
      case UserRole.VENDOR:
        await this.upsertVendor(user, dto);
        break;
      case UserRole.CONSUMER:
        await this.upsertConsumer(user, dto);
        break;
      // NBFC / UNDERWRITER / ADMIN need no profile tables (yet)
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
    return true;
  }

  /* ------------------------------------------------------------- */
  /* helpers                                                       */
  /* ------------------------------------------------------------- */
  private applyUserCoreUpdates(user: User, dto: UpdateUserDto): void {
    if (dto.email) user.email = dto.email;
    if (dto.phone) user.phone = dto.phone;
    if (dto.first_name) user.first_name = dto.first_name;
    if (dto.last_name) user.last_name = dto.last_name;
    if (dto.role) user.role = dto.role;
  }

  private async upsertVendor(user: User, dto: UpdateUserDto): Promise<void> {
    const vendor =
      (await this.vendorRepo.findOne({ where: { user: { id: user.id } } })) ??
      this.vendorRepo.create({ user });

    if (dto.business_name) vendor.business_name = dto.business_name;
    if (dto.address) vendor.address = dto.address;

    await this.vendorRepo.save(vendor);
  }

  private async upsertConsumer(user: User, dto: UpdateUserDto): Promise<void> {
    const consumer =
      (await this.consumerRepo.findOne({ where: { user: { id: user.id } } })) ??
      this.consumerRepo.create({ user });

    const setIf = <K extends keyof (ConsumerDetails | UpdateUserDto)>(
      key: K,
    ) => {
      if (dto[key] !== undefined) (consumer[key] as any) = dto[key];
    };

    // apply only consumer-specific keys
    (
      [
        'date_of_birth',
        'gender',
        'marital_status',
        'alt_phone',
        'address',
        'monthly_income',
        'source_of_income',
        'aadhar_number',
        'pan_number',
      ] as const
    ).forEach(setIf);

    await this.consumerRepo.save(consumer);
  }
}
