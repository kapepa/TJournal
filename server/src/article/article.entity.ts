import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { SubscribeEntity } from '../subscribe/subscribe.entity';
import { ChatEntity } from '../chat/chat.entity';

@Entity({ name: 'article' })
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.article, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => SubscribeEntity, (subscribe) => subscribe.article, { onDelete: 'CASCADE' })
  subscribe: SubscribeEntity;

  @OneToOne(() => ChatEntity, (chat) => chat.article,{ onDelete: 'CASCADE' })
  @JoinColumn()
  chat: ChatEntity;

  @ManyToMany(() => UserEntity, (user) => user.articleLikes, { onDelete: 'CASCADE' })
  articleLikes: UserEntity[];

  @ManyToMany(() => UserEntity, (user) => user.exclude, { onDelete: 'CASCADE' })
  exclude: UserEntity[];

  @Column({ default: false })
  myLikes: boolean;

  @Column({ default: 0 })
  likes: number;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;
}
