import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

class AnswerNested {
  @Column({ default: 'Ответы на мои комментарии' })
  name: string;

  @Column({ default: false })
  checked: boolean;
}

class RemindersNested {
  @Column({ default: 'Упоминания в комментариях к постам' })
  name: string;

  @Column({ default: false })
  checked: boolean;
}

class RatingsNested {
  @Column({ default: 'Оценки записей и комментариев' })
  name: string;

  @Column({ default: false })
  checked: boolean;
}

class CommentsNested {
  @Column({ default: 'Новые комментарии к постам' })
  name: string;

  @Column({ default: false })
  checked: boolean;
}

class SubscribersNested {
  @Column({ default: 'Новые подписчики' })
  name: string;

  @Column({ default: false })
  checked: boolean;
}

@Entity({ name: 'message' })
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, (user) => user.list)
  user: UserEntity;

  @Column(() => AnswerNested)
  answer: AnswerNested;

  @Column(() => RemindersNested)
  reminders: RemindersNested;

  @Column(() => RatingsNested)
  ratings: RatingsNested;

  @Column(() => CommentsNested)
  comments: CommentsNested;

  @Column(() => SubscribersNested)
  subscribers: SubscribersNested;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
