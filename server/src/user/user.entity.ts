import {Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn} from 'typeorm';

@Entity({name: 'user'})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string

  @Column({ default: '' })
  avatar: string;

  @Column({ default: '' })
  cover: string;

  @Column( "simple-array",{ nullable: true })
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