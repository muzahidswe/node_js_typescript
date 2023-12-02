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
import { MasterLocations } from './master-locations.entity';
@Entity({ name: 'master_ff_route_mapping' })
export class MasterFieldForceRouteMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  sbu_id: string;

  @Column()
  field_force_id: number;

  @Column()
  field_force_type: number;

  @Column()
  route_id: number;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

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
