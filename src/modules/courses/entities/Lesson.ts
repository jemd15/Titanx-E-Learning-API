import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Activity } from "./Activity";
import { Unit } from "./Unit";
import { Test } from "./Test";

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

  @OneToMany(() => Activity, (activity) => activity.lesson)
  activities: Activity[];

  @ManyToOne(() => Unit, (unit) => unit.lessons, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "unit_unit_id", referencedColumnName: "unitId" },
    { name: "unit_course_course_id", referencedColumnName: "courseCourseId" },
  ])
  unit: Unit;

  @OneToMany(() => Test, (test) => test.lesson)
  tests: Test[];
}
