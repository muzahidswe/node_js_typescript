import {EntityRepository, Repository} from "typeorm";
import { MasterAppAssetsCategory } from "../entities/master-app-assets-category.entity";

@EntityRepository(MasterAppAssetsCategory)
export class MasterAppAssetsRepository extends Repository<MasterAppAssetsCategory> {

}