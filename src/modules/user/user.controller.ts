import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Cart } from 'src/schemas/cart.schema';

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

    @Post('add-cart')
    async addCart(@Req() request, @Res() response,@Body() cart:Cart){
        const userId = request.app.locals.user._id
        const cartDetails = await this.userService.createCart(cart,userId)
        return response
        .json({message:"book add to cart"})
    }
}
