import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
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

  @OneToOne(() => ArticleEntity, (article) => article.chat,{ onDelete: 'CASCADE' })
  article: ArticleEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.chat, { onDelete: 'CASCADE' })
  @JoinColumn()
  answer: AnswerEntity[];

  @Column({ default: 0 })
  count: number;
}

@Entity({ name: 'answer' })
export class AnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ChatEntity, (chat) => chat.answer, { onDelete: 'CASCADE' })
  chat: ChatEntity;

  @ManyToOne(() => UserEntity, (user) => user.answer,{ onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => AnswerEntity, (answer) => answer.nested, { onDelete: 'CASCADE' })
  inner: AnswerEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.inner, { onDelete: 'CASCADE' })
  @JoinColumn()
  nested: AnswerEntity[];

  @ManyToMany(() => UserEntity, (user) => user.answerLikes, { onDelete: 'CASCADE' })
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
