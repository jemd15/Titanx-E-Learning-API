import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "./Answer";
import { Test } from "./Test";

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

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @ManyToOne(() => Test, (test) => test.questions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "test_test_id", referencedColumnName: "testId" },
    { name: "test_lesson_lesson_id", referencedColumnName: "lessonLessonId" },
    {
      name: "test_lesson_unit_unit_id",
      referencedColumnName: "lessonUnitUnitId",
    },
    {
      name: "test_lesson_unit_course_course_id",
      referencedColumnName: "lessonUnitCourseCourseId",
    },
  ])
  test: Test;
}
