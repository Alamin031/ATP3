import { IsNotEmpty } from "class-validator";

export class CreateOrderDto {

    @IsNotEmpty()
    Pickup_Point: string;

    @IsNotEmpty()
    Delivery_Point: string;

    @IsNotEmpty()
    Product_Type: string;

    @IsNotEmpty()
    PickUp_Time: string;

    @IsNotEmpty()
    Delivery_Time: string;

    @IsNotEmpty()
    Order_Status: string;
  }