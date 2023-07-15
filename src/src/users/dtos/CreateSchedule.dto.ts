import { IsNotEmpty } from "class-validator";

export class CreateScheduleDto {
   @IsNotEmpty()
    Day: string;

    @IsNotEmpty()
    Time: string;
  }