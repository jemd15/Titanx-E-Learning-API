import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./Question";

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
  public answerId: number;

  @Column("varchar", { name: "title", length: 100 })
  public title: string;

  @Column("int", { primary: true, name: "question_question_id" })
  public questionQuestionId: number;

  @Column("int", { primary: true, name: "question_test_test_id" })
  public questionTestTestId: number;

  @Column("int", { primary: true, name: "question_test_lesson_lesson_id" })
  public questionTestLessonLessonId: number;

  @Column("int", { primary: true, name: "question_test_lesson_unit_unit_id" })
  public questionTestLessonUnitUnitId: number;

  @Column("int", {
    primary: true,
    name: "question_test_lesson_unit_course_course_id",
  })
  public questionTestLessonUnitCourseCourseId: number;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "question_question_id", referencedColumnName: "questionId" },
    { name: "question_test_test_id", referencedColumnName: "testTestId" },
    {
      name: "question_test_lesson_lesson_id",
      referencedColumnName: "testLessonLessonId",
    },
    {
      name: "question_test_lesson_unit_unit_id",
      referencedColumnName: "testLessonUnitUnitId",
    },
    {
      name: "question_test_lesson_unit_course_course_id",
      referencedColumnName: "testLessonUnitCourseCourseId",
    },
  ])
  public question: Question;
}
