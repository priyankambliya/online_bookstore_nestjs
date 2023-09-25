// src/cart/cart.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
import { Book } from './book.schema';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Book', required: true })
  bookId:  Book;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
