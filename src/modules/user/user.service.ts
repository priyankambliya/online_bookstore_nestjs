import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from 'src/schemas/book.schema';
import { BookDto } from '../../dto/book.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>
    ) { }
    async allBooksDetails(): Promise<Book[]> {
        try {
            const books = await this.bookModel.find()
            if (!books) throw "all books not found.."
            const bookDto = new BookDto({
                _id: books._id,
                name: books.name,
                author: books.author,
                price: books.price,
            });

            return bookDto
        } catch (error) {
            throw error
        }
    }
}
