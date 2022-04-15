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
  text: string;

  @Column({ default: '' })
  type: string;

  @Column({ default: '' })
  shortDesc: string;

  @Column('simple-array')
  image: string[];

  @Column({ default: 0 })
  likes: number;

  @Column({ default: '' })
  сhat: string;

  @Column({ default: 0 })
  comments: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
