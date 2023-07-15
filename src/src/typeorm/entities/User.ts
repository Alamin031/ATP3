import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './Post';
import { Profile } from './Profile';
import { Vehicle } from './Vehicle';
import {Schedule } from  './Schedule';
import { Order } from './Order';
import { Mngorder } from './ManagementOrder';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email:string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
   authStrategy: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules: Post[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Mngorder, (mngorder) => mngorder.user)
  mngorders: Post[];
 
}
