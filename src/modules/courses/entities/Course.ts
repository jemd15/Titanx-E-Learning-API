import { Column, Entity, OneToMany } from "typeorm";
import { StudentHasCourse } from "../../schools/entities/StudentHasCourse";

@Entity("course", { schema: "titanxcl_e_learning" })
export class Course {
  @Column("int", { primary: true, name: "course_id" })
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

  @OneToMany(
    () => StudentHasCourse,
    (studentHasCourse) => studentHasCourse.courseCourse
  )
  studentHasCourses: StudentHasCourse[];
}
