import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfessorDto } from "@src/dto/professor.dto";
import { StudentDto } from "@src/dto/student.dto";
import { Professor } from "@src/entities/Professor/professor.entity";
import { Student } from "@src/entities/Student/student.entity";
import { Repository } from "typeorm";

@Injectable()
export class ApiService {

    constructor(@InjectRepository(Professor) private readonly professorService: Repository<Professor>,
                @InjectRepository(Student) private readonly studentService: Repository<Student>) {}
    
    async getStudent(studentUsername: string) {

        const student = await this.studentService.findOne({where: {userName: studentUsername}});

        return student;
    }

    async createStudent(student: StudentDto) {

        return await this.studentService.save(student);
    }

    async deleteStudent(studentUsername: string) {   

        return await this.studentService.delete({userName: studentUsername});
    }

    async updateStudent(student: StudentDto) {
        
        const updatedStudent = await this.studentService.update({userName: student.userName}, student);

        return await this.studentService.findOne({where: {userName: student.userName}});
    }

    async createProfessor(professor: ProfessorDto) {
            
            return await this.professorService.save(professor);
        }
    
    async getProfessor(professorUser: string) {
        
                const professor = await this.professorService.findOne({where: {userName: professorUser}});
        
                return professor?.userName;
            }
    
}