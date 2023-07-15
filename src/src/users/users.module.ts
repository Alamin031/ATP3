import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../typeorm/entities/Post';
import { Profile } from '../typeorm/entities/Profile';
import { User } from '../typeorm/entities/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { Vehicle } from 'src/typeorm/entities/Vehicle';
import { Schedule } from 'src/typeorm/entities/Schedule';
import { Order } from 'src/typeorm/entities/Order';
import { Mngorder } from 'src/typeorm/entities/ManagementOrder';





@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post, Vehicle, Schedule, Order, Mngorder])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
