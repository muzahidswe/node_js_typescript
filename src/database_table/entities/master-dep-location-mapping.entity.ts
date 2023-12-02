import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "master_dep_location_mapping"})
export class MasterDepLocationMapping {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sbu_id: string;
    
    @Column()
    dep_id: number;
    
    @Column()
    location_id: number;

    @Column()
    status: number;

}
