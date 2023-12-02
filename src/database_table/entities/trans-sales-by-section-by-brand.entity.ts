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
  
  @Entity({ name: 'trans_sales_by_section_by_brand' })
  export class TransSalesBySectionByBrand {
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
    brand_id: number;

    @Column()
    memos: number;

    @Column()
    volume: number;

    @Column("decimal", { nullable: true, precision: 4, scale: 2 })
    unit_price: number;

    @Column("decimal", { nullable: true, precision: 4, scale: 2 })
    total_price: number;
  
    @CreateDateColumn()
    date: Date;
  
    @Column()
    created_by: number;
  
    @Column()
    updated_by: number;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @CreateDateColumn({ type: 'timestamp' })
    updated_at: Date;
  }
  