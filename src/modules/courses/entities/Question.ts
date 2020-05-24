import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("question_id_UNIQUE", ["questionId"], { unique: true })
@Index(
  "fk_question_test1_idx",
  [
    "testTestId",
    "testLessonLessonId",
    "testLessonUnitUnitId",
    "testLessonUnitCourseCourseId",
  ],
  {}
)
@Entity("question", { schema: "titanxcl_e_learning" })
export class Question {
  @PrimaryGeneratedColumn({ type: "int", name: "question_id" })
  questionId: number;

  @Column("varchar", { name: "title", length: 100 })
  title: string;

  @Column("varchar", { name: "type", length: 45 })
  type: string;

  @Column("int", { primary: true, name: "test_test_id" })
  testTestId: number;

  @Column("int", { primary: true, name: "test_lesson_lesson_id" })
  testLessonLessonId: number;

  @Column("int", { primary: true, name: "test_lesson_unit_unit_id" })
  testLessonUnitUnitId: number;

  @Column("int", { primary: true, name: "test_lesson_unit_course_course_id" })
  testLessonUnitCourseCourseId: number;
}
