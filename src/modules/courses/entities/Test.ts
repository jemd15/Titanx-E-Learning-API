import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./Question";
import { Lesson } from "./Lesson";

@Index("test_id_UNIQUE", ["testId"], { unique: true })
@Index(
  "fk_test_lesson1_idx",
  ["lessonLessonId", "lessonUnitUnitId", "lessonUnitCourseCourseId"],
  {}
)
@Entity("test", { schema: "titanxcl_e_learning" })
export class Test {
  @PrimaryGeneratedColumn({ type: "int", name: "test_id" })
  testId: number;

  @Column("varchar", { name: "state", length: 45 })
  state: string;

  @Column("timestamp", { name: "start", nullable: true })
  start: Date | null;

  @Column("timestamp", { name: "finish", nullable: true })
  finish: Date | null;

  @Column("int", { primary: true, name: "lesson_lesson_id" })
  lessonLessonId: number;

  @Column("int", { primary: true, name: "lesson_unit_unit_id" })
  lessonUnitUnitId: number;

  @Column("int", { primary: true, name: "lesson_unit_course_course_id" })
  lessonUnitCourseCourseId: number;

  @OneToMany(() => Question, (question) => question.test)
  questions: Question[];

  @ManyToOne(() => Lesson, (lesson) => lesson.tests, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "lesson_lesson_id", referencedColumnName: "lessonId" },
    { name: "lesson_unit_unit_id", referencedColumnName: "unitUnitId" },
    {
      name: "lesson_unit_course_course_id",
      referencedColumnName: "unitCourseCourseId",
    },
  ])
  lesson: Lesson;
}
