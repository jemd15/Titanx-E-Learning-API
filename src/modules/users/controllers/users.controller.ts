import { Controller, UseInterceptors, Get, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { MorganInterceptor } from 'nest-morgan';
import { UsersI } from "../classes/users.interface";

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ){}


  @UseInterceptors(MorganInterceptor('combined'))
  @Get()
  async finAllSchools(): Promise<UserI[]> {
    return await this.usersService.findAllSchools();
  }

  @UseInterceptors(MorganInterceptor('combined'))
  @Get('/:schoolId')
  async getCourseById(@Param('schoolId') schoolId: number): Promise<UserI> {
    return await this.usersService.findSchoolById(schoolId);
  }

  @UseInterceptors(MorganInterceptor('combined'))
  @Post('/new')
  async createCourse(@Body() school: Partial<UserI>){
    console.log('creating new school:',school);
    return await this.usersService.createSchool(school);
  }

}
