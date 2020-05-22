import { EntityRepository, Repository } from "typeorm";
import { School } from "../entities/School";

@EntityRepository(School)
export class SchoolsRepository extends Repository<School> {
  
}