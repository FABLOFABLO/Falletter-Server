import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GenderEnum } from "../dto/gender.enum";

@Entity({name: "user"})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true, length: 4})
  name: String;
  
  // @PrimaryColumn()
  @Column({nullable: false, length: 50})
  email: String;

  @Column({nullable: false, length: 100})
  pw: String;

  @Column({type: 'enum', enum: GenderEnum})
  gender: GenderEnum;

  @Column()
  student_num: number;

  @CreateDateColumn()
  createdDate: Date;
}