import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "master_sections" })
export class MasterSections {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sbu_id: string;

    @Column()
    dep_id: number;

    @Column()
    section_code: string;

    @Column()
    section_config_id: number;

    @Column()
    route_id: number;

    @Column()
    effective_startdate: Date;

    @Column()
    effective_enddate: Date;

    @Column()
    status: boolean;

    @Column()
    created_by: number;

    @Column()
    updated_by: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
