import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'chat' })
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => ArticleEntity, (article) => article.chat)
  article: ArticleEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.chat)
  @JoinColumn()
  answer: AnswerEntity[];

  @Column({ default: 0 })
  count: number;
}

@Entity({ name: 'answer' })
export class AnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ChatEntity, (chat) => chat.answer)
  chat: ChatEntity;

  @ManyToOne(() => UserEntity, (user) => user.answer)
  user: UserEntity;

  @ManyToOne(() => AnswerEntity, (answer) => answer.nested)
  inner: AnswerEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.inner)
  @JoinColumn()
  nested: AnswerEntity[];

  @ManyToOne(() => UserEntity, (user) => user.answerLikes)
  answerLikes: UserEntity[];

  @Column({ default: false })
  myLikes: boolean;

  @Column({ default: '' })
  text: string;

  @Column({ default: 0 })
  likes: number;

  @CreateDateColumn()
  created_at: Date;
}
