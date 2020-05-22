import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lesson } from "./Lesson";

@Index("activity_id_UNIQUE", ["activityId"], { unique: true })
@Index(
  "fk_activity_lesson1_idx",
  ["lessonLessonId", "lessonUnitUnitId", "lessonUnitCourseCourseId"],
  {}
)
@Entity("activity", { schema: "titanxcl_e_learning" })
export class Activity {
  @PrimaryGeneratedColumn({ type: "int", name: "activity_id" })
  public activityId: number;

  @Column("int", { name: "number" })
  public number: number;

  @Column("varchar", { name: "description", length: 255 })
  public description: string;

  @Column("varchar", { name: "type", length: 45 })
  public type: string;

  @Column("varchar", { name: "url", length: 255 })
  public url: string;

  @Column("int", { primary: true, name: "lesson_lesson_id" })
  public lessonLessonId: number;

  @Column("int", { primary: true, name: "lesson_unit_unit_id" })
  public lessonUnitUnitId: number;

  @Column("int", { primary: true, name: "lesson_unit_course_course_id" })
  public lessonUnitCourseCourseId: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.activities, {
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
  public lesson: Lesson;
}
