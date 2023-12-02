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
  
  @Entity({ name: 'trans_sales_by_section' })
  export class TransSalesBySection {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    sbu_id: number;
  
    @Column()
    dep_id: number;

    @Column()
    ff_id: number;

    @Column()
    section_id: number;
  
    @Column({nullable:true})
    section_code: string;

    @Column()
    sku_id: number;

    @Column()
    volume: number;

    @Column()
    issue: number;

    @Column()
    return: number;

    @Column()
    memos: number;

    @Column("decimal", { nullable: true, precision: 4, scale: 2 })
    unit_price: number;

    @Column("decimal", { nullable: true, precision: 4, scale: 2 })
    total_price: number;
    
    @CreateDateColumn()
    date: Date;

    @CreateDateColumn()
    apps_version: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @CreateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @Column()
    created_by: number;
  
    @Column()
    updated_by: number;
  }
  