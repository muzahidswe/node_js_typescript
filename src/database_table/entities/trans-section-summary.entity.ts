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

@Entity({ name: 'trans_section_summary' })
export class TransSectionSummary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sbu_id: number;

  @Column()
  dep_id: number;

  @Column({ nullable: true })
  ff_id: number;

  @Column()
  section_id: number;

  @CreateDateColumn()
  date: Date;

  @Column()
  target_outlet: number;

  @Column()
  visited: number;

  @Column({ nullable: true })
  is_multi_routing: number;

  @Column({ nullable: true })
  total_volume: number;

  @Column({ nullable: true })
  total_value: number;

  @Column({ nullable: true })
  successfull_call: number;

  @Column({ nullable: true })
  sales_type: number;

  @Column({ nullable: true })
  total_geo_validation: number;

  @Column()
  apps_version: number;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
