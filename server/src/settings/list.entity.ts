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
  @Column({ default: 'Ответы на мои комментарии'})
  name: string;

  @Column({ default: false})
  checked: boolean;
}

class RatingsNested {
  @Column({ default: 'Оценки записей и комментариев'})
  name: string;

  @Column({ default: false})
  checked: boolean;
}

class RemindersNested {
  @Column({ default: 'Упоминания в комментариях к постам'})
  name: string;

  @Column({ default: false})
  checked: boolean;
}

class MessageNested {
  @Column({ default: 'Новые сообщения'})
  name: string;

  @Column({ default: false})
  checked: boolean;
}

class BestNested {
  @Column({ default: 'Лучшее за неделю'})
  name: string;

  @Column({ default: false})
  checked: boolean;
}

@Entity({ name: 'list' })
export class ListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, (user) => user.list)
  user: UserEntity;

  @Column(() => AnswerNested)
  answer: AnswerNested;

  @Column(() => RatingsNested)
  ratings: RatingsNested;

  @Column(() => RemindersNested)
  reminders: RemindersNested;

  @Column(() => MessageNested)
  message: MessageNested;

  @Column(() => BestNested)
  best: BestNested;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
