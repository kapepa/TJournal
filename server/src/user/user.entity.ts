import {Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  string: string;

  @Column()
  comments: string;

  @Column()
  subs: number;

  @Column()
  listening: number;

  @Column()
  donate: number;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}