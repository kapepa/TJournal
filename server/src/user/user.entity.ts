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

  @OneToMany(() => ArticleEntity, (article) => article.user)
  @JoinColumn()
  article: ArticleEntity[];

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

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: '' })
  cover: string;

  @Column('simple-array', { nullable: true })
  comments: string[];

  @Column({ default: 0 })
  donate: number;

  @Column({ default: 0 })
  subs: number;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
