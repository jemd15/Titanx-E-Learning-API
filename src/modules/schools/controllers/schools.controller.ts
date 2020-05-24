import { Controller, Get, Param, UseInterceptors, Post, Body } from '@nestjs/common';
import { SchoolsService } from '../services/schools.service';
import { School } from '../entities/School';
import { MorganInterceptor } from 'nest-morgan';

@Controller('schools')
export class SchoolsController {

  constructor(
    private readonly schoolsService: SchoolsService
  ){}


  @UseInterceptors(MorganInterceptor('combined'))
  @Get()
  async finAllSchools(): Promise<School[]> {
    return await this.schoolsService.finAllSchools();
  }

  @UseInterceptors(MorganInterceptor('combined'))
  @Get('/:schoolId')
  async getCourseById(@Param('schoolId') schoolId: string): Promise<School> {
    return await this.schoolsService.findSchoolById(schoolId);
  }

  @UseInterceptors(MorganInterceptor('combined'))
  @Post('/new')
  async createCourse(@Body() school: Partial<School>){
    console.log('creating new school:',school);
    return await this.schoolsService.createSchool(school);
  }

}
