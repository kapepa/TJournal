import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'subscribe' })
export class SubscribeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, (user) => user.subscribe)
  user: UserEntity;

  @OneToMany(() => UserEntity, (user) => user.listening)
  subscribe: UserEntity[];

  @Column({ default: 0 })
  subscribers: number;
}
