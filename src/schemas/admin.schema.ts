import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, now } from 'mongoose'
import { Roles } from 'src/enums/roles.enum'

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default: Roles.ADMIN })
    role: Roles;

    @Prop({ default: now() })
    createdAt: Date;

    @Prop({ default: now() })
    updatedAt: Date;
}

export const adminSchema = SchemaFactory.createForClass(Admin)