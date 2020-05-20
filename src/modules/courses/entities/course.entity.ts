import { Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'courses' })
export class Course {

  @PrimaryGeneratedColumn({ name: 'idCourses' })
  courseId: number;

  @Column({ name: 'name', length: 255 })
  name: string;

  @Column({ name: 'imgUrl', length: 255 })
  imgUrl: string;

  @Column({ name: 'school', length: 255 })
  school: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Timestamp;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Timestamp;

}
