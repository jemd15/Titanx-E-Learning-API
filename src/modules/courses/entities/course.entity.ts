import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'course' })
export class Course {

  @PrimaryGeneratedColumn({ name: 'course_id' })
  course_id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'img_url' })
  img_url: string;

  @Column({ name: 'school_id' })
  school_id: number;

  @Column({ name: 'teacher_id' })
  teacher_id: number;

}
