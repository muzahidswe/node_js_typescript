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

@Entity({ name: 'application_settings' })
export class ApplicationSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  property_name: string;

  @Column()
  property_status: number;

  @Column({ nullable: true })
  parent: number;

  @Column({ nullable: true })
  property_value: string;

  @Column({ nullable: true })
  comments: string;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @CreateDateColumn({ type: 'timestamp' })
  created: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated: Date;
}
