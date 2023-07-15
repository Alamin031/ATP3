import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';


@Entity({name: 'vehicle_info'})
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  // Additional properties and relationships can be added as needed

  @ManyToOne(() => User, (user) => user.vehicles)
  user: User;

  
}
