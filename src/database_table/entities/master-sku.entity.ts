import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "master_sku"})
export class MasterSku {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sbu_id: number;

    @Column()
    type: number;

    @Column()
    parent_id: number;

    @Column()
    name: string;

    @Column({nullable:true})
    short_name: string;

    @Column({nullable:true})
    color_code: string;

    @Column({nullable:true})
    material_code: string;

    @Column("decimal",{nullable: true, precision: 4, scale: 2})
    sort: number;

    @Column()
    pack_size: number;

    @Column()
    pack_type: number;

    @Column()
    sales_enable: number;

    @Column()
    report_enable: number;

    @Column()
    shipment_enable: number;

    @Column()
    status: boolean;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @CreateDateColumn({type: 'timestamp'})
    updated_at: Date; 
}
