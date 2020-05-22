import { Injectable } from '@nestjs/common';
import { SchoolsRepository } from '../repositories/schools.repository';
import { School } from '../entities/school.entity';

@Injectable()
export class SchoolsService {

  constructor(
    private schoolsRepository: SchoolsRepository
  ){}

  finAllSchools(): Promise<School[]> {
    return this.schoolsRepository.find();
  }

  findSchoolById(school_id: string): Promise<School> {
    return this.schoolsRepository.findOne(school_id);
  }

}
