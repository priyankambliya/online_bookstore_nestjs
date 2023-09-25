import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, now } from 'mongoose'

enum BookStatus {
    AVAILABLE = 1,
    UNAVAILABLE = 0,
  }

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop()
  name: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop({
    type: Number,
    default: BookStatus.AVAILABLE,
    validate: {
      validator: (value) => {
        console.log("Validator called with value:", value);
        return [BookStatus.AVAILABLE, BookStatus.UNAVAILABLE].includes(value);
      },
      message: 'Invalid activeStatus value. It must be one of: 0 or 1',
    },
  })
  activeStatus: number;

  @Prop()
  numbersOfBooks: number;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const bookSchema = SchemaFactory.createForClass(Book)