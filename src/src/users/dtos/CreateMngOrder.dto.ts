import { IsNotEmpty } from "class-validator";

export class CreateMngOrderDto {
    @IsNotEmpty()
    Title: string;

    @IsNotEmpty()
    Description: string;

    // Additional properties can be added as needed
  }
  