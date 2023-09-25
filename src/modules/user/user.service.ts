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
    async allBooksDetails(): Promise<any> {
        try {
            const books = await this.bookModel.find()
            if (!books) throw "all books not found.."
            const bookData = books.map(book => {
                const bookDto = new BookDto({
                    _id: book._id,
                    name: book.name,
                    author: book.author,
                    price: book.price,
                });
                return bookDto
            })

            return bookData
        } catch (error) {
            throw error
        }
    }
}
