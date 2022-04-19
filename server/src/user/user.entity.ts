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
} from 'typeorm';
import { SettingsEntity } from '../settings/settings.entity';
import { ListEntity } from '../settings/list.entity';
import { MessageEntity } from '../settings/message.entity';
import { ArticleEntity } from '../article/article.entity';
import { SubscribeEntity } from '../subscribe/subscribe.entity';
import { DtoSubscribe } from '../dto/dto.subscribe';

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

  @ManyToOne(() => SubscribeEntity, (subscribe) => subscribe.subscribe)
  @JoinColumn()
  listening: SubscribeEntity;

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
