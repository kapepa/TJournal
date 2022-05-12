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

  @OneToOne(() => SettingsEntity, (settings) => settings.user, { onDelete: 'CASCADE' })
  @JoinColumn()
  settings: SettingsEntity;

  @OneToOne(() => ListEntity, (list) => list.user, { onDelete: 'CASCADE' })
  @JoinColumn()
  list: ListEntity;

  @OneToOne(() => MessageEntity, (message) => message.user, { onDelete: 'CASCADE' })
  @JoinColumn()
  message: MessageEntity;

  @OneToOne(() => SubscribeEntity, (subscribe) => subscribe.user, { onDelete: 'CASCADE' })
  @JoinColumn()
  subscribe: SubscribeEntity;

  @ManyToMany(() => SubscribeEntity, (subscribe) => subscribe.subscribe, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'listening_subscribe',
    joinColumns: [{ name: 'listeningId' }],
    inverseJoinColumns: [{ name: 'subscribeId' }],
  })
  listening: SubscribeEntity[];

  @OneToMany(() => AnswerEntity, (answer) => answer.user, { onDelete: 'CASCADE' })
  answer: AnswerEntity[];

  @OneToMany(() => ArticleEntity, (article) => article.user, { onDelete: 'CASCADE' })
  @JoinColumn()
  article: ArticleEntity[];

  @ManyToMany(() => AnswerEntity, (answer) => answer.answerLikes, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'answer_likes',
    joinColumns: [{ name: 'answerLikes' }],
    inverseJoinColumns: [{ name: 'answerLikes' }],
  })
  answerLikes: AnswerEntity[];

  @ManyToMany(() => ArticleEntity, (article) => article.articleLikes, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'article_likes',
    joinColumns: [{ name: 'articleLikes' }],
    inverseJoinColumns: [{ name: 'articleLikes' }],
  })
  articleLikes: ArticleEntity[];

  @ManyToMany(() => ArticleEntity, (article) => article.exclude, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'exclude_article',
    joinColumns: [{ name: 'exclude' }],
    inverseJoinColumns: [{ name: 'exclude' }],
  })
  exclude: ArticleEntity[];

  @Column()
  name: string;

  @Column({ unique: true, select: false })
  email: string;

  @Column({ default: '', select: false })
  password: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: '' })
  cover: string;

  @Column({ default: 0 })
  donate: number;

  @Column({ default: 0 })
  subs: number;

  @Column({ default: false, select: false })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;
}
