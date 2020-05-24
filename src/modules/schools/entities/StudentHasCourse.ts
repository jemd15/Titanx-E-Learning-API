import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Course } from "../../courses/entities/Course";
import { Student } from "../../users/entities/Student";

@Index("fk_student_has_course_course1_idx", ["courseCourseId"], {})
@Index(
  "fk_student_has_course_student1_idx",
  ["studentStudentId", "studentUserUserId", "studentSchoolSchoolId"],
  {}
)
@Entity("student_has_course", { schema: "titanxcl_e_learning" })
export class StudentHasCourse {
  @Column("int", { primary: true, name: "student_student_id" })
  studentStudentId: number;

  @Column("int", { primary: true, name: "student_user_user_id" })
  studentUserUserId: number;

  @Column("int", { primary: true, name: "student_school_school_id" })
  studentSchoolSchoolId: number;

  @Column("int", { primary: true, name: "course_course_id" })
  courseCourseId: number;

  @ManyToOne(() => Course, (course) => course.studentHasCourses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "course_course_id", referencedColumnName: "courseId" }])
  courseCourse: Course;

  @ManyToOne(() => Student, (student) => student.studentHasCourses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "student_student_id", referencedColumnName: "studentId" },
    { name: "student_user_user_id", referencedColumnName: "userUserId" },
    {
      name: "student_school_school_id",
      referencedColumnName: "schoolSchoolId",
    },
  ])
  student: Student;
}
