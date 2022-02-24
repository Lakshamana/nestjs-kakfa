import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMessageInput {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  index: number;
}
