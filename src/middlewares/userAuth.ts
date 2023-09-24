import { Injectable, NestMiddleware } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { Model } from 'mongoose';
import data from 'security/config';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class userAuth implements NestMiddleware {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) { }
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const authorizationToken = req.headers.authorization;
            if (!authorizationToken) throw 'auth token not found..';
            const token = authorizationToken.split(' ')[1];
            // verify the jwt here...
            const decodedToken = jwt.verify(token, data.SECRET)
            const user = await this.userModel.findOne({ email: decodedToken.email })
            req.app.locals.user = user
            next();
        } catch (error) {
            return res
                .json(error.message)
        }
    }
}
