import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class MessageInput {
  @IsString()
  @IsNotEmpty()
  message: string

  @IsNumber()
  @IsNotEmpty()
  index: number
}
