import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { School } from "../../schools/entities/School";
import { User } from "./User";

@Index("teacher_id_UNIQUE", ["teacherId"], { unique: true })
@Index("fk_teacher_user_idx", ["userUserId"], {})
@Index("fk_teacher_school1_idx", ["schoolSchoolId"], {})
@Entity("teacher", { schema: "titanxcl_e_learning" })
export class Teacher {
  @PrimaryGeneratedColumn({ type: "int", name: "teacher_id" })
  public teacherId: number;

  @Column("int", { primary: true, name: "user_user_id" })
  public userUserId: number;

  @Column("int", { primary: true, name: "school_school_id" })
  public schoolSchoolId: number;

  @ManyToOne(() => School, (school) => school.teachers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "school_school_id", referencedColumnName: "schoolId" }])
  public schoolSchool: School;

  @ManyToOne(() => User, (user) => user.teachers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_user_id", referencedColumnName: "userId" }])
  public userUser: User;

  @RelationId((teacher: Teacher) => teacher.schoolSchool)
  public schoolSchoolId2: number[];

  @RelationId((teacher: Teacher) => teacher.userUser)
  public userUserId2: number[];
}
