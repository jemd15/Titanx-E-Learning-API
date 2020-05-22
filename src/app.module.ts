import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoursesModule } from './modules/courses/courses.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { Course } from './modules/courses/entities/Course';
import { School } from './modules/schools/entities/School';
import { UsersModule } from './modules/users/users.module';
import { Activity } from './modules/courses/entities/Activity';
import { Answer } from './modules/courses/entities/Answer';
import { Lesson } from './modules/courses/entities/Lesson';
import { Question } from './modules/courses/entities/Question';
import { Test } from './modules/courses/entities/Test';
import { Unit } from './modules/courses/entities/Unit';
import { StudentHasCourse } from './modules/schools/entities/StudentHasCourse';
import { User } from './modules/users/entities/User';
import { Teacher } from './modules/users/entities/Teacher';
import { Student } from './modules/users/entities/Student';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mariadb",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "",
      "database": "titanxcl_e_learning",
      "entities": [
        Course,
        School,
        Activity,
        Answer,
        Lesson,
        Question,
        Test,
        Unit,
        StudentHasCourse,
        User,
        Teacher,
        Student
      ],
      "synchronize": true,
      "retryAttempts": 0
    }),
    CoursesModule,
    SchoolsModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
