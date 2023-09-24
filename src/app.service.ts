import { Injectable, NotAcceptableException } from '@nestjs/common'
import { User, UserDocument } from './schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { UserAlreadyExistsException } from './handlers/errorHandler'
import data from 'security/config'
@Injectable()
export class AppService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) { }

    async createUser(user: User): Promise<User> {
        const { username, email, password, role } = user
        const bcryptedPassword = await bcrypt.hash(password, 10)
        const isExist = await this.userModel.findOne({ email })
        if (isExist) throw new UserAlreadyExistsException("This email is already in use..")
        const registeredUser = await this.userModel.create({
            username,
            email,
            password: bcryptedPassword,
            role
        })
        if (!registeredUser) throw new NotAcceptableException()
        return registeredUser
    }

    async loginUser(user: User): Promise<User> {
        const { email, password } = user
        const loginUser = await this.userModel.findOne({ email })
        const isValidPassword = await bcrypt.compare(password, loginUser.password)
        if (!isValidPassword) throw new NotAcceptableException()
        const token =  jwt.sign({email},data.SECRET)
        return token
    }

}
