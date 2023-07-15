import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'schedule' })
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Day: string;

  @Column()
  Time: string;

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;
 
}