import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  messages: string[] = [];

  listMessages(): string[] {
    return this.messages;
  }

  pushMessage(message: string) {
    this.messages.push(message);
  }

  updateMessage(index: number, message: string) {
    if (index < 0 || index > this.messages.length - 1)
      throw new BadRequestException('Index outside array length')

    this.messages[index] = message;
  }

  deleteMessage(index: number) {
    if (index < 0 || index > this.messages.length - 1)
      throw new BadRequestException('Index outside array length')

    this.messages.splice(index, 1);
  }
}
