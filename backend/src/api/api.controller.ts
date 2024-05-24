import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProfessorDto } from "@src/dto/professor.dto";
import { ApiService } from "./api.service";
import { StudentDto } from "@src/dto/student.dto";

@Controller('aurora')
export class ApiController {

    constructor(private readonly apiService: ApiService) {}

    @Post('login')
    async login(@Body() professor: ProfessorDto) {

        return await this.apiService.getProfessor(professor.username);
    }

    @Post('register')
    async register(@Body() professor: ProfessorDto) {

        return await this.apiService.createProfessor(professor);
    }

    @Get('student/:studentUsername')
    async getStudent(@Param('studentUsername') studentUsername: string) {
            
            return await this.apiService.getStudent(studentUsername);
        }
    
    @Post('student/create')
    async createStudent(@Body() student: StudentDto) {
        
            return await this.apiService.createStudent(student);
        }
    
    @Post('student/delete')
    async deleteStudent(@Body() student: StudentDto) {
        
            return await this.apiService.deleteStudent(student.userName);
        }
    
    @Post('student/update')
    async updateStudent(@Body() student: StudentDto) {
        
            return await this.apiService.updateStudent(student);
        }
}