// src/blacklist/blacklist.service.ts

import { Blacklist } from 'src/entities/blacklist.entity';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../user.entity';
import { CreateBlacklistDto } from './dtos/create-blacklist.dto';
import { UpdateBlacklistDto } from './dtos/update-blacklist.dto';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(Blacklist)
    private readonly blacklistRepo: Repository<Blacklist>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<Blacklist[]> {
    return this.blacklistRepo.find({
      relations: ['user'],
    });
  }

  async findOne(id: string): Promise<Blacklist> {
    const item = await this.blacklistRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!item) {
      throw new NotFoundException(`Blacklist entry with id "${id}" not found`);
    }
    return item;
  }

  async create(dto: CreateBlacklistDto): Promise<Blacklist> {
    let linkedUser: User = null;

    // If userId is provided, verify that user exists
    if (dto.userId) {
      linkedUser = await this.userRepo.findOneBy({ id: dto.userId });
      if (!linkedUser) {
        throw new NotFoundException(`User with id "${dto.userId}" not found`);
      }
    }

    const blacklisted = this.blacklistRepo.create({
      pan: dto.pan,
      user: linkedUser || undefined,
    });
    return this.blacklistRepo.save(blacklisted);
  }

  async update(id: string, dto: UpdateBlacklistDto): Promise<Blacklist> {
    const item = await this.findOne(id);

    if (dto.pan !== undefined) {
      item.pan = dto.pan;
    }

    if (dto.userId !== undefined) {
      if (!dto.userId) {
        // If userId is null/empty string => remove association
        item.user = null;
      } else {
        const user = await this.userRepo.findOneBy({ id: dto.userId });
        if (!user) {
          throw new NotFoundException(`User with id "${dto.userId}" not found`);
        }
        item.user = user;
      }
    }

    return this.blacklistRepo.save(item);
  }

  async remove(id: string): Promise<boolean> {
    const item = await this.findOne(id);
    await this.blacklistRepo.remove(item);
    return true;
  }
}
