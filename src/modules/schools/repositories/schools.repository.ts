import { EntityRepository, Repository } from "typeorm";
import { School } from "../entities/school.entity";

@EntityRepository(School)
export class SchoolsRepository extends Repository<School> {
  
}