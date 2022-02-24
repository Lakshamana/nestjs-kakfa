import {CorsOptions} from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
    },
  });

  const corsOptions: CorsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }

  app.enableCors(corsOptions)

  app.startAllMicroservices()
  await app.listen(3000);
}

bootstrap();
