import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('master_menu_access')
export class MasterMenuAccessEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  menu_id: number;

  @Column()
  user_type: number;

  @Column()
  user_id: number;

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
