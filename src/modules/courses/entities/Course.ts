import { Column, Entity, OneToMany } from "typeorm";
import { StudentHasCourse } from "../../schools/entities/StudentHasCourse";
import { Unit } from "./Unit";

@Entity("course", { schema: "titanxcl_e_learning" })
export class Course {
  @Column("int", { primary: true, name: "course_id" })
  public courseId: number;

  @Column("int", { name: "school_id" })
  public schoolId: number;

  @Column("varchar", { name: "name", length: 255 })
  public name: string;

  @Column("varchar", { name: "img_url", length: 255 })
  public imgUrl: string;

  @Column("int", { primary: true, name: "teacher_teacher_id" })
  public teacherTeacherId: number;

  @Column("int", { primary: true, name: "teacher_user_user_id" })
  public teacherUserUserId: number;

  @Column("int", { primary: true, name: "teacher_school_school_id" })
  public teacherSchoolSchoolId: number;

  @OneToMany(
    () => StudentHasCourse,
    (studentHasCourse) => studentHasCourse.courseCourse
  )
  public studentHasCourses: StudentHasCourse[];

  @OneToMany(() => Unit, (unit) => unit.courseCourse)
  public units: Unit[];
}
