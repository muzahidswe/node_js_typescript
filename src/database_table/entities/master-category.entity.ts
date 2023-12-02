import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MasterLocations } from "./master-locations.entity";
@Entity({name: "master_category"})
export class MasterCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sbu_id: string;

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
