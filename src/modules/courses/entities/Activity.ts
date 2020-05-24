import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("activity_id_UNIQUE", ["activityId"], { unique: true })
@Index(
  "fk_activity_lesson1_idx",
  ["lessonLessonId", "lessonUnitUnitId", "lessonUnitCourseCourseId"],
  {}
)
@Entity("activity", { schema: "titanxcl_e_learning" })
export class Activity {
  @PrimaryGeneratedColumn({ type: "int", name: "activity_id" })
  activityId: number;

  @Column("int", { name: "number" })
  number: number;

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("varchar", { name: "type", length: 45 })
  type: string;

  @Column("varchar", { name: "url", length: 255 })
  url: string;

  @Column("int", { primary: true, name: "lesson_lesson_id" })
  lessonLessonId: number;

  @Column("int", { primary: true, name: "lesson_unit_unit_id" })
  lessonUnitUnitId: number;

  @Column("int", { primary: true, name: "lesson_unit_course_course_id" })
  lessonUnitCourseCourseId: number;
}
