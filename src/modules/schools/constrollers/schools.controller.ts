import { Controller, Get, Param } from '@nestjs/common';
import { SchoolsService } from '../services/schools.service';
import { School } from '../entities/school.entity';

@Controller('schools')
export class SchoolsController {

  constructor(
    private readonly schoolsService: SchoolsService
  ){}


  @Get()
  async finAllSchools(): Promise<School[]> {
    return await this.schoolsService.finAllSchools();
  }

  @Get('/:schoolId')
  async getCourseById(@Param('schoolId') schoolId: string): Promise<School> {
    return await this.schoolsService.findSchoolById(schoolId);
  }

}
