import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Post } from './typeorm/entities/Post';
import { Profile } from './typeorm/entities/Profile';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Vehicle } from './typeorm/entities/Vehicle';
import { PusherService } from './pusher.service';
import { Schedule } from './typeorm/entities/Schedule';
import { Order } from './typeorm/entities/Order';
import { Mngorder } from './typeorm/entities/ManagementOrder';

import { Service } from './.service';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'deliveryman',
      entities: [User, Profile, Post, Vehicle, Schedule, Order, Mngorder],
      synchronize: true,
    }),
    UsersModule,
    
  ],
  controllers: [AppController],
  providers: [AppService,PusherService, Service],
})
export class AppModule {}
