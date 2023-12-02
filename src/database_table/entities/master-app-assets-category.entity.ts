import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MasterAppAssets } from "./master-app-assets.entity";

@Entity({name: "master_app_assets_category"})
export class MasterAppAssetsCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sbu_id: number;

    @Column()
    slug: string;

    @OneToMany(() => MasterAppAssets, (assets) => assets.assetsCategory)
    assets: MasterAppAssets[]
}
