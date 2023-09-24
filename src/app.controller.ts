import { Body, Controller, Post, Res } from '@nestjs/common'
import { AppService } from './app.service'
import { User } from './schemas/user.schema'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('register')
  async register(@Res() response, @Body() user: User) {
    await this.appService.createUser(user)
    return response
      .json({ message: "user created..." })
  }

  @Post('login')
  async login(@Res() response, @Body() user: User) {
    const token = await this.appService.loginUser(user)
    return response
      .json({ token })
  }
}
