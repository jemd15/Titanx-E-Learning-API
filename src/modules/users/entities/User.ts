import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

@Index("user_id_UNIQUE", ["userId"], { unique: true })
@Index("email_UNIQUE", ["email"], { unique: true })
@Entity("user", { schema: "titanxcl_e_learning" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id" })
  public userId: number;

  @Column("varchar", { name: "name", length: 45 })
  public name: string;

  @Column("varchar", { name: "lastName", length: 45 })
  public lastName: string;

  @Column("varchar", { name: "email", unique: true, length: 45 })
  public email: string;

  @Column("varchar", { name: "password", length: 45 })
  public password: string;

  @Column("varchar", { name: "rol", length: 45 })
  public rol: string;

  @Column("timestamp", { name: "createdAt", nullable: true })
  public createdAt: Date | null;

  @Column("timestamp", { name: "lastLogin", nullable: true })
  public lastLogin: Date | null;

  @OneToMany(() => Student, (student) => student.userUser)
  public students: Student[];

  @OneToMany(() => Teacher, (teacher) => teacher.userUser)
  public teachers: Teacher[];
}
