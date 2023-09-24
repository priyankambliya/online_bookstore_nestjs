import { AdminDocument } from './../../schemas/admin.schema';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/schemas/admin.schema';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserAlreadyExistsException } from 'src/handlers/errorHandler';
import data from 'security/config';
import { Book, BookDocument } from 'src/schemas/book.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,

  ) {}

  async createUser(user: Admin): Promise<Admin> {
    const { email, password, role } = user;
    const bcryptedPassword = await bcrypt.hash(password, 10);
    const isExist = await this.adminModel.find();
    if (isExist.length > 0)
      throw new UserAlreadyExistsException('Admin already exist...');
    const registeredUser = await this.adminModel.create({
      email,
      password: bcryptedPassword,
      role,
    });
    if (!registeredUser) throw new NotAcceptableException();
    return registeredUser;
  }

  async loginUser(user: Admin): Promise<Admin> {
    try {
      const { email, password } = user;
      const loginUser = await this.adminModel.findOne({ email });
      if (!loginUser) throw 'admin not loged in...';
      const isValidPassword = await bcrypt.compare(
        password,
        loginUser.password,
      );
      if (!isValidPassword) throw new NotAcceptableException();
      const token = jwt.sign({ email }, data.SECRET);
      return token;
    } catch (error) {
      throw error;
    }
  }

  async bookCreate(book: Book): Promise<Book> {
    try {
      const { name,author,price } = book;
      
        const createBook = await this.bookModel.create({
            name,
            author,
            price
        })
      if(!createBook) throw "book not created..."
      
      return createBook;
    } catch (error) {
      throw error;
    }
  }

  async updateBook(book:any): Promise<Book> {
    try {      
        const {name,author,price,bookId} = book
        const updatedBook = await this.bookModel.findByIdAndUpdate(bookId,{
          name,
          author,
          price
        })
        if(!updatedBook) throw "book not updated.."
      return updatedBook
    } catch (error) {
      throw error;
    }
  }

  async updateBookStatus(bookData:any): Promise<string> {
    try {     
        const { bookId,status } = bookData 
        const book = await this.bookModel.findByIdAndUpdate(bookId,{
          activeStatus:status
        })
        if(!book) throw "book status not changed.."
      return "book status changed.."
    } catch (error) {
      throw error;
    }
  }
}
