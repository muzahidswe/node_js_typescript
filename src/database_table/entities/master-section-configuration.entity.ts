import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "master_section_configuration" })
export class MasterSectionConfiguration {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sbu_id: number;

    @Column()
    slug: string;

    @Column()
    frequency_type: string;

    @Column()
    active_days: string;

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
