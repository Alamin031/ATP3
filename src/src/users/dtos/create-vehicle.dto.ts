import { IsNotEmpty } from "class-validator";

export class CreateVehicleDto {
    @IsNotEmpty()
    make: string;

    @IsNotEmpty()
    model: string;

    @IsNotEmpty()
    year: number;
    // Additional properties can be added as needed
  }
  