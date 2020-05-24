import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("lesson_id_UNIQUE", ["lessonId"], { unique: true })
@Index("fk_lesson_unit1_idx", ["unitUnitId", "unitCourseCourseId"], {})
@Entity("lesson", { schema: "titanxcl_e_learning" })
export class Lesson {
  @PrimaryGeneratedColumn({ type: "int", name: "lesson_id" })
  lessonId: number;

  @Column("int", { name: "number" })
  number: number;

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("int", { primary: true, name: "unit_unit_id" })
  unitUnitId: number;

  @Column("int", { primary: true, name: "unit_course_course_id" })
  unitCourseCourseId: number;
}
