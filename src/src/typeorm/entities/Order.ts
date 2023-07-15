import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity({name: 'order'})
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Pickup_Point: string;

  @Column()
  Delivery_Point: string;

  @Column()
  Product_Type: string;

  @Column()
  PickUp_Time: string;

  @Column()
  Delivery_Time: string;

  @Column()
  Order_Status:string;

  // Additional properties and relationships can be added as needed

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
