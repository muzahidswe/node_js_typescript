import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'master_field_forces' })
export class MasterFieldForce {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sbu_id: string;

  @Column()
  dep_id: number;

  @Column()
  fullname: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  username: string;

  @Column()
  contact_no: string;

  @Column({ nullable: true })
  nid: number;

  @Column()
  visiting_frequency: string;

  @Column()
  user_type: number;

  @Column()
  status: number;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
