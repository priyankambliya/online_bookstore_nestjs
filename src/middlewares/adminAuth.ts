import { Injectable, NestMiddleware } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { Model } from 'mongoose';
import data from 'security/config';
import { Admin, AdminDocument } from 'src/schemas/admin.schema';

@Injectable()
export class adminAuth implements NestMiddleware {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>
  ) { }
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationToken = req.headers.authorization;
      if (!authorizationToken) throw 'auth token not found..';
      const token = authorizationToken.split(' ')[1];
      // verify the jwt here...
      const decodedToken = await jwt.verify(token, data.SECRET)
      const user = await this.adminModel.findOne({ email: decodedToken.email })
      req.app.locals.admin = user
      next();
    } catch (error) {
      return res
        .json(error.message)
    }
  }
}
