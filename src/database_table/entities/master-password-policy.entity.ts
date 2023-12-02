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
  
  @Entity({ name: 'master_password_policy' })
  export class MasterPasswordPolicy {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    min_uses_value: number;
  
    @Column()
    max_uses_value: number;
  
    @Column()
    rule_type: string;
  
    @Column()
    description_rule: string;  
     
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
  