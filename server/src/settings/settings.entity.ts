import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'settings' })
export class SettingsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, (user) => user.settings)
  user: UserEntity;

  @Column({ default: '' })
  description: string;

  @Column({ default: false })
  online: boolean;

  @Column({ default: '' })
  ribbon: string;

  @Column()
  sorting: string;

  @Column()
  entry: string;

  @Column()
  adult: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
