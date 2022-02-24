import { Module } from '@nestjs/common'
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices'
import { AppController } from './app.controller'
import { MessageService } from './message.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MESSAGE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'message',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'message-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [MessageService, ClientKafka],
})
export class AppModule {}
