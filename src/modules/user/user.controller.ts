import { Controller, Get, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get('all-books')
    async allBooks(@Res() response) {
        const books = await this.userService.allBooksDetails()
        return response
            .json(books)
    }
}
