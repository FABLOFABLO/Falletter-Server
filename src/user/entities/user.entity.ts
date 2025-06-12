import { min } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @CreateDateColumn()
  createdDate: Date;
}