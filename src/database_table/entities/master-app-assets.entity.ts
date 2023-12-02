import { Column,  Entity,ManyToOne , PrimaryGeneratedColumn } from "typeorm";
import { MasterAppAssetsCategory } from "./master-app-assets-category.entity";

@Entity({name: "master_app_assets"})
export class MasterAppAssets {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sbu_id: number;

    @Column()
    url: string; 

    @ManyToOne(() => MasterAppAssetsCategory, (assetsCategory) => assetsCategory.assets)
    assetsCategory: MasterAppAssetsCategory
}
