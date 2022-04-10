import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { SettingsEntity } from '../settings/settings.entity';
import {ListEntity} from "../settings/list.entity";

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => SettingsEntity, (settings) => settings.user)
  @JoinColumn()
  settings: SettingsEntity;

  @OneToOne(() => ListEntity, (settings) => settings.user)
  @JoinColumn()
  list: ListEntity;

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
  subs: number;

  @Column({ default: 0 })
  listening: number;

  @Column({ default: 0 })
  donate: number;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
