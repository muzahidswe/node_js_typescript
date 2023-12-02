import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { TransSalesBySectionByBrandRepository } from 'src/database_table/repository/trans-sales-by-section-by-brand.repository';
import { TransSalesBySectionClassificationRepository } from 'src/database_table/repository/trans-sales-by-section-by-classification.repository';
import { TransSectionSummaryRepository } from 'src/database_table/repository/trans-section-summary.repository';
import { MasterCategoryRepository } from 'src/database_table/repository/master-category.repository';
import { MasterProductClassificationsRepository } from 'src/database_table/repository/master-product-classifications.repository';
import { MasterSkuRepository } from 'src/database_table/repository/master-sku.repository';
import { TransSalesBySectionRepository } from 'src/database_table/repository/trans-sales-by-section.repository';

import { getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { forEach, groupBy } from 'lodash';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(TransSalesBySectionByBrandRepository)
    private readonly transSalesBySectionByBrandRepository: TransSalesBySectionByBrandRepository,

    @InjectRepository(TransSalesBySectionClassificationRepository)
    private readonly transSalesBySectionClassificationRepository: TransSalesBySectionClassificationRepository,

    @InjectRepository(TransSectionSummaryRepository)
    private readonly transSectionSummaryRepository: TransSectionSummaryRepository,

    @InjectRepository(MasterCategoryRepository)
    private readonly masterCategoryRepository: MasterCategoryRepository,

    @InjectRepository(MasterProductClassificationsRepository)
    private readonly masterProductClassificationsRepository: MasterProductClassificationsRepository,

    @InjectRepository(MasterSkuRepository)
    private readonly masterSkuRepository: MasterSkuRepository,

    @InjectRepository(TransSalesBySectionRepository)
    private readonly transSalesBySectionRepository: TransSalesBySectionRepository
  ) {}

  async getDashboardData(createDashboardDto: CreateDashboardDto) {
    try {
      const sbu_id = createDashboardDto.sbu_id;
      const dep_id = createDashboardDto.dep_id;
      const date_range = createDashboardDto.date_range;
      const date_arr = date_range.split(' ');
      const start_date = date_arr[0];
      const end_date = date_arr[1];
      
      const brand_wise_stt = await this.transSalesBySectionByBrandRepository
        .query(`
                SELECT
                  date,
                  brand_id,
                  master_product_classifications.slug AS brand_name,
                  SUM( volume ) AS stt 
              FROM
                trans_sales_by_section_by_brand
                INNER JOIN master_product_classifications ON master_product_classifications.id = trans_sales_by_section_by_brand.brand_id 
              WHERE
                ( date BETWEEN '${start_date}' AND '${end_date}' ) 
                AND trans_sales_by_section_by_brand.sbu_id = ${sbu_id}
                AND trans_sales_by_section_by_brand.dep_id = ${dep_id} 
              GROUP BY
                brand_id,
                date
        `);
      // return brand_wise_stt;
      const tlp = [32, 33, 34];
      const cnc = [35, 36, 37];
      const gt = [38];

      //GT=38, C&C=35,36,37 TLP=32,33,34
      const sales_by_section_by_classification =
        await this.transSalesBySectionClassificationRepository.query(
          `SELECT
           date,dep_id,classification_data
        FROM
        trans_sales_by_section_by_classification                
        WHERE
          date BETWEEN '${start_date}' AND '${end_date}'
          AND dep_id=${dep_id} AND sbu_id=${sbu_id}`
        );
      // return sales_by_section_by_classification;

      const result = sales_by_section_by_classification.map(
        (classification) => {
          const stt_data = JSON.parse(classification.classification_data);
          //moment(classification.date).format('YYYY-MM-DD')
        }
      );
      return result;
    } catch (error) {
      return {
        message: error.message,
        success: true,
        data: ''
      };
    }
  }
  /*
  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  findAll() {
    return `This action returns all dashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
  */
}
