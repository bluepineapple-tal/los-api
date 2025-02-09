import { Blacklist } from 'src/entities/blacklist.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user.entity';
import { BlacklistController } from './blacklist.controller';
import { BlacklistResolver } from './blacklist.resolver';
import { BlacklistService } from './blacklist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blacklist, User])],
  providers: [BlacklistService, BlacklistResolver],
  controllers: [BlacklistController],
  exports: [BlacklistService],
})
export class BlacklistModule {}
