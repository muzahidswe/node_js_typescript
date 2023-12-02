import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: "ref_users_dep_mapping"})
export class RefUsersDepMapping {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sbu_id: number;

    @Column()
    user_id: number;

    @Column()
    dep_id: number;

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
