import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, adminSchema } from 'src/schemas/admin.schema';
import { adminAuth } from 'src/middlewares/adminAuth';
import { Book, bookSchema } from 'src/schemas/book.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Admin.name, schema: adminSchema }]),
    MongooseModule.forFeature([{ name: Book.name, schema: bookSchema }]),
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(adminAuth)
      .forRoutes({ path: 'admin/book*', method: RequestMethod.ALL });
  }
}
