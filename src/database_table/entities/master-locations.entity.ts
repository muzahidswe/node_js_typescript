import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { MasterCategory } from './master-category.entity';
@Entity({ name: 'master_locations' })
export class MasterLocations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sbu_id: string;

  @Column()
  location_type: number;

  @Column()
  parent_id: number;

  @Column()
  slug: string;

  @Column()
  status: boolean;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
