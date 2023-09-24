import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from 'src/schemas/admin.schema';
import { Book } from 'src/schemas/book.schema';
import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  async register(@Res() response, @Body() user: Admin) {
    await this.adminService.createUser(user);
    return response.json({ message: 'admin created...' });
  }

  @Post('login')
  async login(@Res() response, @Body() user: Admin) {
    try {
      const token = await this.adminService.loginUser(user);
      return response.json({ token });
    } catch (error) {
      return response.json({ error });
    }
  }

  @Roles(['ADMIN'])
  @UseGuards(AuthGuard)
  @Post('book/book-create')
  async createBook(@Res() response, @Body() book: Book) {
    try {
      const bookDetail = await this.adminService.bookCreate(book);
      if(!bookDetail) throw "book not created.."
      return response.json({message:"book created.."});
    } catch (error) {
      return response.json({ error });
    }
  }

  @Roles(['ADMIN'])
  @UseGuards(AuthGuard)
  @Post('book/book-update')
  async update(@Res() response, @Body() book:any) {
    try {
      const bookDetail = await this.adminService.updateBook(book);
      if(!bookDetail) throw "book not updated.."
      return response.json({message:"book updated.."});
    } catch (error) {
      return response.json({ error });
    }
  }

  @Roles(['ADMIN'])
  @UseGuards(AuthGuard)
  @Post('book/update-status')
  async updateStatus(@Res() response, @Body() book:any) {
    try {
      const message = await this.adminService.updateBookStatus(book);
      if(!message) throw "book status not updated.."
      return response.json({message:"book status updated.."});
    } catch (error) {
      return response.json({ error });
    }
  }
}
