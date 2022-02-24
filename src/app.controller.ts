import {
  Body,
  Controller,
  Delete,
  Get,
  MessageEvent,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { MessageService } from './message.service'
import { MessageInput } from './input/message.input'
import { UpdateMessageInput } from './input/update-message.input'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { Observable, of } from 'rxjs'

@Controller()
export class AppController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/push')
  pushMessage(@Body() payload: MessageInput) {
    this.messageService.pushMessage(payload.message)
  }

  @Get('/all')
  listMessages(): string[] {
    return this.messageService.listMessages()
  }

  @Put('/update')
  async updateMessage(@Body() payload: UpdateMessageInput) {
    const { message, index } = payload
    await this.messageService.updateMessage(index, message)
  }

  @Delete('/delete')
  async deleteMessage(@Query('index', ParseIntPipe) index: number) {
    await this.messageService.deleteMessage(index)
  }

  @MessagePattern('message')
  subscribeToMessageEvents(@Payload() message: any): Observable<MessageEvent> {
    console.log({ value: message.value })
    return of(message.value)
  }
}
