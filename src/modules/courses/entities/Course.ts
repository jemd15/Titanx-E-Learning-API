import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Teacher } from "../../users/entities/Teacher";
import { StudentHasCourse } from "../../schools/entities/StudentHasCourse";
import { Unit } from "./Unit";

@Index(
  "fk_course_teacher1_idx",
  ["teacherTeacherId", "teacherUserUserId", "teacherSchoolSchoolId"],
  {}
)
@Entity("course", { schema: "titanxcl_e_learning" })
export class Course {
  @PrimaryGeneratedColumn({ type: "int", name: "course_id" })
  courseId: number;

  @Column("int", { name: "school_id" })
  schoolId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "img_url", length: 255 })
  imgUrl: string;

  @Column("int", { primary: true, name: "teacher_teacher_id" })
  teacherTeacherId: number;

  @Column("int", { primary: true, name: "teacher_user_user_id" })
  teacherUserUserId: number;

  @Column("int", { primary: true, name: "teacher_school_school_id" })
  teacherSchoolSchoolId: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "teacher_teacher_id", referencedColumnName: "teacherId" },
    { name: "teacher_user_user_id", referencedColumnName: "userUserId" },
    {
      name: "teacher_school_school_id",
      referencedColumnName: "schoolSchoolId",
    },
  ])
  teacher: Teacher;

  @OneToMany(
    () => StudentHasCourse,
    (studentHasCourse) => studentHasCourse.courseCourse
  )
  studentHasCourses: StudentHasCourse[];

  @OneToMany(() => Unit, (unit) => unit.courseCourse)
  units: Unit[];
}
