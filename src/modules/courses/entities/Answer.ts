import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("answer_id_UNIQUE", ["answerId"], { unique: true })
@Index(
  "fk_answer_question1_idx",
  [
    "questionQuestionId",
    "questionTestTestId",
    "questionTestLessonLessonId",
    "questionTestLessonUnitUnitId",
    "questionTestLessonUnitCourseCourseId",
  ],
  {}
)
@Entity("answer", { schema: "titanxcl_e_learning" })
export class Answer {
  @PrimaryGeneratedColumn({ type: "int", name: "answer_id" })
  answerId: number;

  @Column("varchar", { name: "title", length: 100 })
  title: string;

  @Column("int", { primary: true, name: "question_question_id" })
  questionQuestionId: number;

  @Column("int", { primary: true, name: "question_test_test_id" })
  questionTestTestId: number;

  @Column("int", { primary: true, name: "question_test_lesson_lesson_id" })
  questionTestLessonLessonId: number;

  @Column("int", { primary: true, name: "question_test_lesson_unit_unit_id" })
  questionTestLessonUnitUnitId: number;

  @Column("int", {
    primary: true,
    name: "question_test_lesson_unit_course_course_id",
  })
  questionTestLessonUnitCourseCourseId: number;
}
