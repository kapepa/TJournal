import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'chat' })
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  name: string;

  @OneToOne(() => ArticleEntity, (article) => article.chat)
  article: ArticleEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.chat)
  answer: AnswerEntity[];
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
  nested: AnswerEntity[];

  @Column({ default: '' })
  text: string;

  @Column({ default: 0 })
  likes: number;

  @CreateDateColumn()
  created_at: Date;
}
