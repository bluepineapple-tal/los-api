import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consumer } from 'src/entities/consumer.entity';
import { User, UserRole } from 'src/entities/user.entity';
import { Vendor } from 'src/entities/vendor.entity';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,

    @InjectRepository(Consumer)
    private readonly consumerRepository: Repository<Consumer>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['vendor', 'consumer'], // if we want to load profiles
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['vendor', 'consumer'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  /**
   * Create a new user. If role is vendor, create a Vendor profile;
   * if role is consumer, create a Consumer profile.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const {
      email,
      password,
      role,
      business_name,
      address,
      phone,
      first_name,
      last_name,
    } = createUserDto;

    // Create the user record
    const user = this.userRepository.create({
      email,
      password_hash: password, // TODO: hash the password
      role,
    });

    // Save the new user
    const savedUser = await this.userRepository.save(user);

    // If vendor, create a vendor profile
    if (role === UserRole.VENDOR && business_name) {
      const vendor = this.vendorRepository.create({
        user: savedUser,
        business_name,
        address,
        phone,
      });
      await this.vendorRepository.save(vendor);
    }

    // If consumer, create a consumer profile
    if (role === UserRole.CONSUMER && first_name) {
      const consumer = this.consumerRepository.create({
        user: savedUser,
        first_name,
        last_name,
        phone,
      });
      await this.consumerRepository.save(consumer);
    }

    return this.findOne(savedUser.id); // return user with relations loaded
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // If email is present, update it
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    // If password is present, update it
    if (updateUserDto.password) {
      user.password_hash = updateUserDto.password; // normally hashed
    }

    // If you allow updating role, handle that here
    if (updateUserDto.role) {
      user.role = updateUserDto.role;
    }

    await this.userRepository.save(user);

    // Update vendor profile if this user is or became a vendor
    if (user.role === UserRole.VENDOR) {
      const vendor = await this.vendorRepository.findOne({
        where: { user: { id } },
      });
      if (vendor) {
        vendor.business_name =
          updateUserDto.business_name ?? vendor.business_name;
        vendor.address = updateUserDto.address ?? vendor.address;
        vendor.phone = updateUserDto.phone ?? vendor.phone;
        await this.vendorRepository.save(vendor);
      }
    }

    // Update consumer profile if this user is or became a consumer
    if (user.role === UserRole.CONSUMER) {
      const consumer = await this.consumerRepository.findOne({
        where: { user: { id } },
      });
      if (consumer) {
        consumer.first_name = updateUserDto.first_name ?? consumer.first_name;
        consumer.last_name = updateUserDto.last_name ?? consumer.last_name;
        consumer.phone = updateUserDto.phone ?? consumer.phone;
        await this.consumerRepository.save(consumer);
      }
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return true;
  }
}
