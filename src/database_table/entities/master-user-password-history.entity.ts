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


  @Entity({ name: 'master_user_password_history' })
  export class MasterPasswordHisotry {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false })
    user_id: number;

    @Column({ nullable: false })
    sbu_id: number;    
  
    @Column({ nullable: false })
    password_hash: string;  
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
  }
  