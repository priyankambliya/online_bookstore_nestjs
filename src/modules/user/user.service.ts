import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { Book, BookDocument } from 'src/schemas/book.schema';
import { BookDto } from '../../dto/book.dto';
import { Cart, CartDocument } from 'src/schemas/cart.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
        @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>
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

    async createCart(cart:Cart,userId:string):Promise<Cart> {
        const bookId:string|any = cart.bookId
        const quantity:any = cart.quantity
        const bookObjectId = new mongoose.Types.ObjectId(bookId) 
        const userObjectId = new mongoose.Types.ObjectId(userId)
        const createCart = await this.cartModel.create({
            bookId:bookObjectId,
            userId:userObjectId,
            quantity
        })
        if(!createCart) throw "cart not created.."
        return createCart
    }
}
