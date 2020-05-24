import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lesson } from "./Lesson";
import { Course } from "./Course";

@Index("unit_id_UNIQUE", ["unitId"], { unique: true })
@Index("fk_unit_course1_idx", ["courseCourseId"], {})
@Entity("unit", { schema: "titanxcl_e_learning" })
export class Unit {
  @PrimaryGeneratedColumn({ type: "int", name: "unit_id" })
  unitId: number;

  @Column("int", { name: "number" })
  number: number;

  @Column("varchar", { name: "title", length: 100 })
  title: string;

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("varchar", { name: "state", length: 45 })
  state: string;

  @Column("int", { primary: true, name: "course_course_id" })
  courseCourseId: number;

  @OneToMany(() => Lesson, (lesson) => lesson.unit)
  lessons: Lesson[];

  @ManyToOne(() => Course, (course) => course.units, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "course_course_id", referencedColumnName: "courseId" }])
  courseCourse: Course;
}
