import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from '../services/courses.service';
import { Course } from '../entities/Course';

@Controller('courses')
export class CoursesController {

  constructor(
    private readonly coursesService: CoursesService
  ){}

  @Get()
  async getAllCourses(): Promise<Course[]> {
    return await this.coursesService.findAllCourses();
  }

  @Get('/:courseId')
  async getCourseById(@Param('courseId') courseId: string): Promise<Course> {
    return await this.coursesService.findCourseById(courseId);
  }

}
