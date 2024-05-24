import { Module } from "@nestjs/common";
import { ApiController } from "./api.controller";
import { ApiService } from "./api.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Professor } from "@src/entities/Professor/professor.entity";
import { Student } from "@src/entities/Student/student.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Professor, Student])],
    controllers: [ApiController],
    providers: [ApiService],
})
export class ApiModule{}