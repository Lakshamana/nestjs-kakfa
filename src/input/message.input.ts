import { PickType } from '@nestjs/mapped-types';
import { UpdateMessageInput } from './update-message.input';

export class MessageInput extends PickType(UpdateMessageInput, ['message']) {}
