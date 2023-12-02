import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "master_price_list" })
export class MasterPriceList {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sbu_id: number;

    @Column()
    price_group_id: number;

    @Column()
    sku_id: number;

    @Column("decimal", { nullable: true, precision: 4, scale: 2 })
    price: number;

    @Column({ type: 'timestamp' })
    start_datetime: Date;

    @Column({ type: 'timestamp' })
    end_datetime: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
