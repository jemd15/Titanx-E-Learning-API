import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'school' })
export class School {

  @PrimaryGeneratedColumn({ name: 'school_id' })
  school_id: number;

  @Column({ name: 'name' })
  name: string;
  
}