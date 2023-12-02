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
  
  @Entity({ name: 'trans_sales_by_section_by_classification' })
  export class TransSalesBySectionClassification {
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
    
    @CreateDateColumn()
    classification_data: string;

    @CreateDateColumn()
    date: Date;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @CreateDateColumn({ type: 'timestamp' })
    updated_at: Date;
  }
  