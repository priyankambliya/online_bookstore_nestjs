import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, now } from 'mongoose'

export type BookDocument = Book & Document;

@Schema()
export class Book {
    @Prop()
    name: string;

    @Prop()
    author: string;

    @Prop()
    price: number;

    @Prop({ default: now() })
    createdAt: Date;

    @Prop({ default: now() })
    updatedAt: Date;
}

export const bookSchema = SchemaFactory.createForClass(Book)