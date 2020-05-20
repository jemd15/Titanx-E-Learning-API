import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoursesModule } from './modules/courses/courses.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { Course } from './modules/courses/entities/course.entity';
import { School } from './modules/schools/entities/school.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "",
      "database": "test",
      "entities": [Course, School],
      "synchronize": true
    }),
    CoursesModule,
    SchoolsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
