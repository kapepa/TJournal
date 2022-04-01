import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  shortDesc: string;

  @Column()
  text: string;

  @Column()
  image: string;

  @Column()
  likes: string;

  @Column()
  сhat: string;

  @Column()
  comments: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}