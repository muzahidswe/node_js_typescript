import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "master_routes" })
export class MasterRoutes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sbu_id: string;

    @Column()
    dep_id: number;

    @Column()
    slug: string;

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
