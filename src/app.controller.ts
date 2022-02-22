import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
import { MessageService } from './message.service'
import { MessageInput } from './input/message.input'

@Controller()
export class AppController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/push')
  pushMessage(@Body('message') message: string) {
    this.messageService.pushMessage(message)
  }

  @Get('/all')
  listMessages(): string[] {
    return this.messageService.listMessages()
  }

  @Put('/update')
  updateMessage(@Body() payload: MessageInput) {
    const { message, index } = payload
    this.messageService.updateMessage(index, message)
  }

  @Delete('/delete')
  deleteMessage(@Query('index', ParseIntPipe) index: number) {
    this.messageService.deleteMessage(index)
  }
}
