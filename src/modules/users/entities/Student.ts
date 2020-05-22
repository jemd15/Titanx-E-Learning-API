import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { School } from "../../schools/entities/School";
import { User } from "./User";
import { StudentHasCourse } from "../../schools/entities/StudentHasCourse";

@Index("student_id_UNIQUE", ["studentId"], { unique: true })
@Index("fk_student_user1_idx", ["userUserId"], {})
@Index("fk_student_school1_idx", ["schoolSchoolId"], {})
@Entity("student", { schema: "titanxcl_e_learning" })
export class Student {
  @PrimaryGeneratedColumn({ type: "int", name: "student_id" })
  public studentId: number;

  @Column("int", { primary: true, name: "user_user_id" })
  public userUserId: number;

  @Column("int", { primary: true, name: "school_school_id" })
  public schoolSchoolId: number;

  @ManyToOne(() => School, (school) => school.students, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "school_school_id", referencedColumnName: "schoolId" }])
  public schoolSchool: School;

  @ManyToOne(() => User, (user) => user.students, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_user_id", referencedColumnName: "userId" }])
  public userUser: User;

  @OneToMany(
    () => StudentHasCourse,
    (studentHasCourse) => studentHasCourse.student
  )
  public studentHasCourses: StudentHasCourse[];

  @RelationId((student: Student) => student.schoolSchool)
  public schoolSchoolId2: number[];

  @RelationId((student: Student) => student.userUser)
  public userUserId2: number[];
}
