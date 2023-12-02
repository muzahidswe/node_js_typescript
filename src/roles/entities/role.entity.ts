import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "master_user_role"})
export class Role {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sbu_id: number;

    @Column()
    name: string;

    @Column()
    remark: string;

    @Column()
    can_view: boolean;

    @Column()
    can_insert: boolean;

    @Column()
    can_edit: boolean;

    @Column()
    can_delete: boolean;

    @Column()
    can_export: boolean;

    @Column()
    status: boolean;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @Column()
    created_by: number;

    @CreateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @Column()
    updated_by: number;

    @DeleteDateColumn() 
    deleted_at?: Date;
     
}
