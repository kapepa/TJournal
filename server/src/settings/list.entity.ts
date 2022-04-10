import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'list' })
export class ListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, (user) => user.list)
  user: UserEntity;

  @Column('simple-json')
  answer: { name: 'Ответы на мои комментарии'; checked: false };

  @Column('simple-json')
  ratings: { name: 'Оценки записей и комментариев'; checked: true };

  @Column('simple-json')
  reminders: { name: 'Упоминания в комментариях к постам'; checked: false };

  @Column('simple-json')
  message: { name: 'Новые сообщения'; checked: false };

  @Column({ default: 'all' })
  best: { name: 'Лучшее за неделю'; checked: false };

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
