import { Injectable } from '@nestjs/common';
import { CoursesRepository } from '../repositories/courses.repository';
import { Course } from '../entities/Course';

@Injectable()
export class CoursesService {

  constructor(
    private coursesRepository: CoursesRepository
  ){}

  findAllCourses(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  async findCourseById(courseId: number): Promise<Course> {
    return await this.coursesRepository
      .createQueryBuilder('course')
      .where('course_id = :courseId', { courseId })
      .getOne();
  }

  async createCourse(course): Promise<Course> {
    return await this.coursesRepository.save(course);
  }

}
