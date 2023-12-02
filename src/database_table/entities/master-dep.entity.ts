import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: "master_dep"})
export class MasterDep {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sbu_id: string;

    @Column()
    parent_location_id: number;

    @Column()
    name: string;

    @Column()
    display_name: string;
    
    @Column()
    email: string;
    
    @Column()
    contact_no: string;
    
    @Column()
    skus: string;

    @Column({nullable:true})
    code: string;

    @Column({nullable:true})
    tin: string;

    @Column({nullable:true})
    address: string;

    @Column({nullable:true})
    trade_license_no: string;

    @Column()
    status: number;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @CreateDateColumn({type: 'timestamp'})
    updated_at: Date;
}
