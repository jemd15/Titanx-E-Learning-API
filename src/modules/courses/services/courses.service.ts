import { Injectable } from '@nestjs/common';
import { CoursesRepository } from '../repositories/courses.repository';
import { Course } from '../entities/course.entity';

@Injectable()
export class CoursesService {

  constructor(
    private coursesRepository: CoursesRepository
  ){}

  findAllCourses(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  findCourseById(courseId: string): Promise<Course> {
    return this.coursesRepository.findOne(courseId);
  }

}
