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

  @Column({ default: 'popular' })
  ribbon: string;

  @Column({ default: 'default' })
  sorting: string;

  @Column({ default: 'all' })
  entry: string;

  @Column({ default: 'all' })
  adult: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
