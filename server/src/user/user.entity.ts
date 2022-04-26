import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { SettingsEntity } from '../settings/settings.entity';
import { ListEntity } from '../settings/list.entity';
import { MessageEntity } from '../settings/message.entity';
import { ArticleEntity } from '../article/article.entity';
import { SubscribeEntity } from '../subscribe/subscribe.entity';
import { AnswerEntity } from '../chat/chat.entity';
import { Exclude } from 'class-transformer';

@Exclude()
@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => SettingsEntity, (settings) => settings.user)
  @JoinColumn()
  settings: SettingsEntity;

  @OneToOne(() => ListEntity, (list) => list.user)
  @JoinColumn()
  list: ListEntity;

  @OneToOne(() => MessageEntity, (message) => message.user)
  @JoinColumn()
  message: MessageEntity;

  @OneToOne(() => SubscribeEntity, (subscribe) => subscribe.user)
  @JoinColumn()
  subscribe: SubscribeEntity;

  @ManyToMany(() => SubscribeEntity, (subscribe) => subscribe.subscribe)
  @JoinTable({
    name: 'listening_subscribe',
    joinColumns: [{ name: 'listeningId' }],
    inverseJoinColumns: [{ name: 'subscribeId' }],
  })
  listening: SubscribeEntity[];

  @OneToMany(() => AnswerEntity, (answer) => answer.user)
  answer: AnswerEntity[];

  @OneToMany(() => ArticleEntity, (article) => article.user)
  @JoinColumn()
  article: ArticleEntity[];

  @ManyToMany(() => AnswerEntity, (answer) => answer.answerLikes)
  @JoinTable({
    name: 'answer_likes',
    joinColumns: [{ name: 'answerLikes' }],
    inverseJoinColumns: [{ name: 'answerLikes' }],
  })
  answerLikes: AnswerEntity[];

  @ManyToMany(() => ArticleEntity, (answer) => answer.articleLikes)
  @JoinTable({
    name: 'article_likes',
    joinColumns: [{ name: 'articleLikes' }],
    inverseJoinColumns: [{ name: 'articleLikes' }],
  })
  articleLikes: ArticleEntity[];

  @Column()
  name: string;

  @Column({ unique: true })
  @Exclude({ toPlainOnly: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: '' })
  cover: string;

  @Column({ default: 0 })
  donate: number;

  @Column({ default: 0 })
  subs: number;

  @Exclude({ toPlainOnly: true })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;
}
