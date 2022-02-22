import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MessageService } from './message.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [MessageService],
})
export class AppModule {}
