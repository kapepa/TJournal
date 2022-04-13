import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'article' })
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.article)
  user: UserEntity;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  shortDesc: string;

  @Column()
  text: string;

  @Column('simple-array')
  image: string[];

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
