import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { CoursesService } from '../services/courses.service';
import { Course } from '../entities/Course';
import { MorganInterceptor } from 'nest-morgan';

@Controller('courses')
export class CoursesController {

  constructor(
    private readonly coursesService: CoursesService
  ){}

  @UseInterceptors(MorganInterceptor('combined'))
  @Get()
  async getAllCourses(): Promise<Course[]> {
    return await this.coursesService.findAllCourses();
  }

  @UseInterceptors(MorganInterceptor('combined'))
  @Get('/:courseId')
  async getCourseById(@Param('courseId') courseId: number): Promise<Course> {
    return await this.coursesService.findCourseById(courseId);
  }

}
