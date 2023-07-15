import { IsNotEmpty } from "class-validator";

export class CreateUserPostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
