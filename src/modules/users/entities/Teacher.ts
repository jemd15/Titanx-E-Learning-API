import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { School } from "../../schools/entities/School";
import { User } from "./User";

@Index("teacher_id_UNIQUE", ["teacherId"], { unique: true })
@Index("fk_teacher_user_idx", ["userUserId"], {})
@Index("fk_teacher_school1_idx", ["schoolSchoolId"], {})
@Entity("teacher", { schema: "titanxcl_e_learning" })
export class Teacher {
  @PrimaryGeneratedColumn({ type: "int", name: "teacher_id" })
  teacherId: number;

  @Column("int", { primary: true, name: "user_user_id" })
  userUserId: number;

  @Column("int", { primary: true, name: "school_school_id" })
  schoolSchoolId: number;

  @ManyToOne(() => School, (school) => school.teachers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "school_school_id", referencedColumnName: "schoolId" }])
  schoolSchool: School;

  @ManyToOne(() => User, (user) => user.teachers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_user_id", referencedColumnName: "userId" }])
  userUser: User;
}
