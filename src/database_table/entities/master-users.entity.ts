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


  @Entity({ name: 'master_users' })
  export class MasterUsers {

    @PrimaryGeneratedColumn() 
    id: number;
  
    @Column({ nullable: true })
    sbu_id: number;
  
    @Column({ nullable: true })
    user_type_id: number;
  
    @Column({ nullable: true })
    user_role_id: string;
  
    @Column({ nullable: true })
    name: string;
  
    @Column({ nullable: true })
    email: string;
  
    @Column({ nullable: true })
    username: string;
  
    @Column({ nullable: true })
    password: string;
  
    @Column({ nullable: true })
    contact: number;
  
    @Column({ nullable: true })
    status: number;
  
    @Column({ nullable: true })
    image: string;
  
    @Column({ nullable: true })
    created_by: number;
  
    @Column({ nullable: true })
    updated_by: number;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @CreateDateColumn({ type: 'timestamp' })
    updated_at: Date;
  }
  