import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'master_menu' })
export class MasterMenuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sbu_id: number;

  @Column()
  menu_name: string;

  @Column()
  parent_menu_id: number;

  @Column()
  menu_type: string;

  @Column()
  menu_url: string;

  @Column()
  menu_icon_class: string;

  @Column()
  menu_order: number;

  @Column()
  description: string;

  @Column()
  module_id: number;

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
