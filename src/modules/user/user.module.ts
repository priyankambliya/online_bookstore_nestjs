import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, bookSchema } from 'src/schemas/book.schema';
import { adminSchema } from 'src/schemas/admin.schema';
import { userAuth } from 'src/middlewares/userAuth';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Cart, CartSchema } from 'src/schemas/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Book.name, schema: bookSchema }]),
    MongooseModule.forFeature([{ name:Cart.name , schema:CartSchema }])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(userAuth)
      .forRoutes(UserController);
  }
}