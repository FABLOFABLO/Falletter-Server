import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "user"})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: String;
  
  // @PrimaryColumn()
  @Column({nullable: false})
  email: String;

  @Column({nullable: false})
  pw: String;

  @CreateDateColumn()
  createDate: Date;

  @Column({nullable: true})
  refreshToken: String;
}