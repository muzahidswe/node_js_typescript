import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "master_product_classifications"})
export class MasterProductClassifications {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sbu_id: number;

    @Column()
    parent: number;

    @Column()
    type: number;

    @Column()
    slug: string;

    @Column({nullable:true})
    display_label: string;

    @Column()
    status: number;

    @Column("decimal",{nullable: true, precision: 4, scale: 2})
    sort: number;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @CreateDateColumn({type: 'timestamp'})
    updated_at: Date; 
}
