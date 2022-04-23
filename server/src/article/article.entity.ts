import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { SubscribeEntity } from '../subscribe/subscribe.entity';
import { ChatEntity } from '../chat/chat.entity';

@Entity({ name: 'article' })
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.article)
  user: UserEntity;

  @ManyToOne(() => SubscribeEntity, (subscribe) => subscribe.article)
  subscribe: SubscribeEntity;

  @OneToOne(() => ChatEntity, (chat) => chat.article)
  @JoinColumn()
  chat: ChatEntity;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
