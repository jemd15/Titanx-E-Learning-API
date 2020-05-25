import { Injectable } from '@nestjs/common';
import { SchoolsRepository } from '../repositories/schools.repository';
import { School } from '../entities/School';

@Injectable()
export class SchoolsService {

  constructor(
    private schoolsRepository: SchoolsRepository
  ){}

  findAllSchools(): Promise<School[]> {
    return this.schoolsRepository.find();
  }

  findSchoolById(school_id: number): Promise<School> {
    return this.schoolsRepository.findOne(school_id);
  }

  async createSchool(school: Partial<School>): Promise<School> {
    return await this.schoolsRepository.save(school);
  }

}
