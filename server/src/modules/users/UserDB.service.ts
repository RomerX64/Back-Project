import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./User.entity";
import { Repository } from "typeorm";


@Injectable()
export class UserDBService{
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>
    ){}
}