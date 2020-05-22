import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../../users/entities/Student";
import { Teacher } from "../../users/entities/Teacher";

@Entity("school", { schema: "titanxcl_e_learning" })
export class School {
  @PrimaryGeneratedColumn({ type: "int", name: "school_id" })
  public schoolId: number;

  @Column("varchar", { name: "name", length: 45 })
  public name: string;

  @OneToMany(() => Student, (student) => student.schoolSchool)
  public students: Student[];

  @OneToMany(() => Teacher, (teacher) => teacher.schoolSchool)
  public teachers: Teacher[];
}
