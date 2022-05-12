import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ArticleEntity } from '../article/article.entity';

@Entity({ name: 'subscribe' })
export class SubscribeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, (user) => user.subscribe,{ onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.listening,{ onDelete: 'CASCADE' })
  subscribe: UserEntity[];

  @OneToMany(() => ArticleEntity, (article) => article.subscribe,{ onDelete: 'CASCADE' })
  article: ArticleEntity[];

  @Column({ default: false })
  sub: boolean;

  @Column({ default: 0 })
  subscribers: number;
}
