import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterAppAssetsRepository } from 'src/database_table/repository/master-app-assets.repository';

@Injectable()
export class StaticFileService {
  constructor(
    @InjectRepository(MasterAppAssetsRepository)
    private readonly staticFileRepository: MasterAppAssetsRepository,
  ) {
  }

  async findAll() {
    // return await this.staticFileRepository.find(
    //   {
    //     relations:['assets']
    //   }
    // );
    let assets =  await this.staticFileRepository
      .createQueryBuilder('assetCat')
      .leftJoinAndSelect("assetCat.assets", "assetsCategory")
      .select(['assetCat.id', 'assetCat.slug','assetsCategory.url'])
      .getMany();
    
    let finalAssets = [];

    assets.forEach(eachElemnet => {
        let tempAssets = eachElemnet.assets.map(obj=>{ return '/static-file/'+ obj.url})
        let assetsCat = {...eachElemnet,assets:tempAssets}; 
        finalAssets.push(assetsCat);
    });

    return finalAssets;

  }
  
}
