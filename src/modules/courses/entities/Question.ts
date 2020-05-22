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
  public questionId: number;

  @Column("varchar", { name: "title", length: 100 })
  public title: string;

  @Column("varchar", { name: "type", length: 45 })
  public type: string;

  @Column("int", { primary: true, name: "test_test_id" })
  public testTestId: number;

  @Column("int", { primary: true, name: "test_lesson_lesson_id" })
  public testLessonLessonId: number;

  @Column("int", { primary: true, name: "test_lesson_unit_unit_id" })
  public testLessonUnitUnitId: number;

  @Column("int", { primary: true, name: "test_lesson_unit_course_course_id" })
  public testLessonUnitCourseCourseId: number;

  @OneToMany(() => Answer, (answer) => answer.question)
  public answers: Answer[];

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
  public test: Test;
}
