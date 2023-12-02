import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePasswordDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApplicationSettingsRepository } from 'src/database_table/repository/application-settings.repository';
import { MasterPasswordHisotryRepository } from 'src/database_table/repository/master-user-password-history.repository';
import { MasterUsersRepository } from 'src/database_table/repository/master-users.repository';
import { MasterPasswordPolicyRepository } from 'src/database_table/repository/master-password-policy.repository';
import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
const excel = require('exceljs');
const cells = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'AA',
  'AB',
  'AC',
  'AD',
  'AE',
  'AF',
  'AG',
  'AH',
  'AI',
  'AJ',
  'AK',
  'AL',
  'AM',
  'AN',
  'AO',
  'AP',
  'AQ',
  'AR',
  'AS',
  'AT',
  'AU',
  'AV',
  'AW',
  'AX',
  'AY',
  'AZ',
  'BA',
  'BB',
  'BC',
  'BD',
  'BE',
  'BF',
  'BG',
  'BH',
  'BI',
  'BJ',
  'BK',
  'BL',
  'BM',
  'BN',
  'BO',
  'BP',
  'BQ',
  'BR',
  'BS',
  'BT',
  'BU',
  'BV',
  'BW',
  'BX',
  'BY',
  'BZ',
  'CA',
  'CB',
  'CC',
  'CD',
  'CE',
  'CF',
  'CG',
  'CH',
  'CI',
  'CJ',
  'CK',
  'CL',
  'CM',
  'CN',
  'CO',
  'CP',
  'CQ',
  'CR',
  'CS',
  'CT',
  'CU',
  'CV',
  'CW',
  'CX',
  'CY',
  'CZ',
  'DA',
  'DB',
  'DC',
  'DD',
  'DE',
  'DF',
  'DG',
  'DH',
  'DI',
  'DJ',
  'DK',
  'DL',
  'DM',
  'DN',
  'DO',
  'DP',
  'DQ',
  'DR',
  'DS',
  'DT',
  'DU',
  'DV',
  'DW',
  'DX',
  'DY',
  'DZ',
  'EA',
  'EB',
  'EC',
  'ED',
  'EE',
  'EF',
  'EG',
  'EH',
  'EI',
  'EJ',
  'EK',
  'EL',
  'EM',
  'EN',
  'EO',
  'EP',
  'EQ',
  'ER',
  'ES',
  'ET',
  'EU',
  'EV',
  'EW',
  'EX',
  'EY',
  'EZ',
  'FA',
  'FB',
  'FC',
  'FD',
  'FE',
  'FF',
  'FG',
  'FH',
  'FI',
  'FJ',
  'FK',
  'FL',
  'FM',
  'FN',
  'FO',
  'FP',
  'FQ',
  'FR',
  'FS',
  'FT',
  'FU',
  'FV',
  'FW',
  'FX',
  'FY',
  'FZ',
  'GA',
  'GB',
  'GC',
  'GD',
  'GE',
  'GF',
  'GG',
  'GH',
  'GI',
  'GJ',
  'GK',
  'GL',
  'GM',
  'GN',
  'GO',
  'GP',
  'GQ',
  'GR',
  'GS',
  'GT',
  'GU',
  'GV',
  'GW',
  'GX',
  'GY',
  'GZ',
  'HA',
  'HB',
  'HC',
  'HD',
  'HE',
  'HF',
  'HG',
  'HH',
  'HI',
  'HJ',
  'HK',
  'HL',
  'HM',
  'HN',
  'HO',
  'HP',
  'HQ',
  'HR',
  'HS',
  'HT',
  'HU',
  'HV',
  'HW',
  'HX',
  'HY',
  'HZ',
  'IA',
  'IB',
  'IC',
  'ID',
  'IE',
  'IF',
  'IG',
  'IH',
  'II',
  'IJ',
  'IK',
  'IL',
  'IM',
  'IN',
  'IO',
  'IP',
  'IQ',
  'IR',
  'IS',
  'IT',
  'IU',
  'IV',
  'IW',
  'IX',
  'IY',
  'IZ',
  'JA',
  'JB',
  'JC',
  'JD',
  'JE',
  'JF',
  'JG',
  'JH',
  'JI',
  'JJ',
  'JK',
  'JL',
  'JM',
  'JN',
  'JO',
  'JP',
  'JQ',
  'JR',
  'JS',
  'JT',
  'JU',
  'JV',
  'JW',
  'JX',
  'JY',
  'JZ',
  'KA',
  'KB',
  'KC',
  'KD',
  'KE',
  'KF',
  'KG',
  'KH',
  'KI',
  'KJ',
  'KK',
  'KL',
  'KM',
  'KN',
  'KO',
  'KP',
  'KQ',
  'KR',
  'KS',
  'KT',
  'KU',
  'KV',
  'KW',
  'KX',
  'KY',
  'KZ',
  'LA',
  'LB',
  'LC',
  'LD',
  'LE',
  'LF',
  'LG',
  'LH',
  'LI',
  'LJ',
  'LK',
  'LL',
  'LM',
  'LN',
  'LO',
  'LP',
  'LQ',
  'LR',
  'LS',
  'LT',
  'LU',
  'LV',
  'LW',
  'LX',
  'LY',
  'LZ',
  'MA',
  'MB',
  'MC',
  'MD',
  'ME',
  'MF',
  'MG',
  'MH',
  'MI',
  'MJ',
  'MK',
  'ML',
  'MM',
  'MN',
  'MO',
  'MP',
  'MQ',
  'MR',
  'MS',
  'MT',
  'MU',
  'MV',
  'MW',
  'MX',
  'MY',
  'MZ',
  'NA',
  'NB',
  'NC',
  'ND',
  'NE',
  'NF',
  'NG',
  'NH',
  'NI',
  'NJ',
  'NK',
  'NL',
  'NM',
  'NN',
  'NO',
  'NP',
  'NQ',
  'NR',
  'NS',
  'NT',
  'NU',
  'NV',
  'NW',
  'NX',
  'NY',
  'NZ'
];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(ApplicationSettingsRepository)
    private readonly applicationSettingsRepository: ApplicationSettingsRepository,
    @InjectRepository(MasterPasswordHisotryRepository)
    private readonly masterPasswordHisotryRepository: MasterPasswordHisotryRepository,
    @InjectRepository(MasterUsersRepository)
    private readonly masterUsersRepository: MasterUsersRepository,
    @InjectRepository(MasterPasswordPolicyRepository)
    private readonly masterPasswordPolicyRepository: MasterPasswordPolicyRepository
  ) {}

  async changePassword(updatePasswordDto: UpdatePasswordDto) {
    try {
      //return updatePasswordDto;
      const sbu_id = updatePasswordDto.sbu_id;

      const saltOrRounds = 10;
      const old_pwd = updatePasswordDto.old_password;

      const new_pwd = updatePasswordDto.new_password;
      const encrypted_new_pwd = await bcrypt.hash(new_pwd, saltOrRounds);

      const user_id = updatePasswordDto.user_id;

      const user_current_passowrd = await this.masterUsersRepository.query(
        `select password FROM master_users 
          where id = ${user_id} AND JSON_CONTAINS(sbu_id, '[${sbu_id}]' ) `
      );
      const user_hash_pwd = user_current_passowrd[0].password;
      const old_pwd_check = await bcrypt.compare(old_pwd, user_hash_pwd);
      if (old_pwd == new_pwd) {
        return {
          success: false,
          message:
            'Opps ! old password and new password are same. Please check again'
        };
      } else if (!old_pwd_check) {
        return {
          success: false,
          message:
            'Opps ! old password does not match with our system. Please check again'
        };
      } else {
        const password_history_obj = {
          user_id: user_id,
          sbu_id: sbu_id,
          password_hash: encrypted_new_pwd
        };
        const store_pwd_history =
          await this.masterPasswordHisotryRepository.save(password_history_obj);

        const field_force_route_mapping_update =
          await this.masterUsersRepository.query(
            `UPDATE
           master_users
          SET password= '${encrypted_new_pwd}'
        WHERE
          1 = 1
          AND id = '${user_id}' AND JSON_CONTAINS(sbu_id, '[${sbu_id}]' )`
          );

        return {
          success: true,
          message: 'Password has changed succesfully'
        };
      }
    } catch (error) {
      return {
        message: error.message,
        success: true,
        data: ''
      };
    }
  }

  async getPasswordPolicyDetails(sbu_id) {
    try {
      //return sbu_id;
      const password_policy_list =
        await this.masterPasswordPolicyRepository.query(
          `SELECT
        id,
        description
      FROM
        master_password_policy         
        WHERE
          status = 1 AND JSON_CONTAINS(sbu_id, '[${sbu_id}]' )`
        );
      //final_list['assigned_sr'] = sr_list;
      return {
        success: true,
        data: password_policy_list
      };
    } catch (error) {
      return {
        message: error.message,
        success: true,
        data: ''
      };
    }
  }
  /*
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  */

  async getPainterDump(response) {
    const data_info = await this.masterUsersRepository.query(
      `SELECT
          *
        FROM
          master_users         
          WHERE
            status = 1`
    );

    let file_name = 'shibly';
    let file_header = 'This is a dynamic header.';
    const header = [
      'Id',
      'Sbu Id(Optional)',
      'User Types Id',
      'User Role Id',
      'Name',
      'Email',
      'User Name',
      'Password',
      'Contact',
      'Status',
      'Image',
      'Created By',
      'Updated By',
      'Created At',
      'Updated At',
      'Comments'
    ];

    return this.generateExcelReport(
      response,
      file_name,
      data_info,
      file_header
    );
  }

  async generateExcelReport(
    response,
    fileName: string,
    data: any,
    file_header,
    row_header: any = ''
  ) {
    const first_obj = data[0];
    let first_obj_keys = Object.keys(first_obj);

    let data_key = [];
    first_obj_keys.forEach(function (value) {
      data_key.push(value);
    });
    //return header;
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet(fileName);

    let header_row_start = 4;
    let row_start = header_row_start + 1;
    let initial_col_start = 1;

    worksheet.mergeCells('B2', 'G2');
    worksheet.getCell('B2').value = file_header;
    worksheet.getCell('B2').alignment = {
      vertical: 'middle',
      horizontal: 'center'
    };
    worksheet.getCell('B2').font = {
      name: 'Arial Black',
      color: { argb: 'FFFFF' },
      family: 2,
      size: 14,
      italic: true,
      bold: true
    };
    worksheet.getCell('B2').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '808080' }
    };

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let col_start = initial_col_start;

      data_key.forEach(async (k, i) => {
        let each_letter_value = cells[col_start];
        let current_cell = each_letter_value + row_start;
        let current_header_cell = each_letter_value + header_row_start;

        if (row_header.length == 0) {
          let replaceable_val = k;
          const each_value_except_underscore = replaceable_val.replace(
            /_/g,
            ' '
          );
          const final_string_with_uppercase =
            each_value_except_underscore.replace(
              /(^\w{1})|(\s+\w{1})/g,
              (letter) => letter.toUpperCase()
            );
          let header_cell = worksheet.getCell(current_header_cell);
          header_cell.value = final_string_with_uppercase;
        } else {
          let header_cell = worksheet.getCell(current_header_cell);
          header_cell.value = row_header[i];
        }

        let each_cell = worksheet.getCell(current_cell);
        each_cell.value = element[k];

        each_cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        each_cell.alignment = { vertical: 'middle', horizontal: 'center' };

        col_start = col_start + 1;
      });

      row_start = row_start + 1;
      col_start = 1;
    }

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if (rowNumber == header_row_start) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '808080' }
          };
          cell.font = {
            name: 'Calibri',
            size: 11,
            bold: true,
            color: { argb: 'FFFFFF' }
          };
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center'
          };
        }
      });
      row.commit();
    });

    /*
    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=' + fileName + '.xlsx'
    );
    return workbook.xlsx.write(response).then(function () {
      response.status(200).end();
    });
    */

    // for save file into the exact location.

    const datas = await workbook.xlsx
      .writeFile(`excel_file/${fileName}.xlsx`)
      .then(() => {
        response.send({
          status: 'success',
          message: 'file successfully downloaded',
          path: `${response}/${fileName}.xlsx`
        });
      });
  }
}
