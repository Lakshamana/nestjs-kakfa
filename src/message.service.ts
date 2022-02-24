import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { EventTypes } from './event-types.enum'
import { MessageEventPayload } from './message-event-payload.interface'

@Injectable()
export class MessageService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('MESSAGE_SERVICE') private client: ClientKafka) {}

  onModuleInit() {
    this.client.subscribeToResponseOf('message')
  }

  onModuleDestroy() {
    this.client.close()
  }

  messages: string[] = []

  listMessages(): string[] {
    return this.messages
  }

  makePayload(type: string, message?: string, index?: number): MessageEventPayload {
    return {
      type,
      message,
      index,
    }
  }

  async pushMessage(message: string) {
    this.messages.push(message)
    await firstValueFrom(this.client.send('message', this.makePayload(EventTypes.PUSH, message)))
  }

  async updateMessage(index: number, message: string) {
    if (index < 0 || index > this.messages.length - 1)
      throw new BadRequestException('Index outside array length')

    this.messages[index] = message
    await firstValueFrom(this.client.send('message', this.makePayload(EventTypes.UPDATE, message)))
  }

  async deleteMessage(index: number) {
    if (index < 0 || index > this.messages.length - 1)
      throw new BadRequestException('Index outside array length')

    this.messages.splice(index, 1)
    await firstValueFrom(
      this.client.send('message', this.makePayload(EventTypes.DELETE, null, index)),
    )
  }
}
