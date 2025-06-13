import { User } from "discord.js";
import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class communityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  title: String;

  @Column({length: 1000})
  content: String;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @CreateDateColumn()
  create_date: Date;
}