import { uniqBy } from 'lodash';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterMenuRepository } from '../database_table/repository/master-menu.repository';
import { GlobalService } from '../utils/global.service';
import { MasterMenuAccessRepository } from '../database_table/repository/master-menu-access.repository';
import {
  CreateMenuDto,
  MenuItemDeleteDto,
  UpdateMenuDto
} from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MasterMenuRepository)
    private readonly masterMenuRepository: MasterMenuRepository,
    @InjectRepository(MasterMenuAccessRepository)
    private readonly masterMenuAccessRepository: MasterMenuAccessRepository
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    try {
      const { status, user_id, user_type } = createMenuDto;
      const menuData = JSON.parse(JSON.stringify(createMenuDto));
      const { userId, userTypeId } = GlobalService;
      if (!user_id && !user_type) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Missing required field user id or user type',
            success: false
          },
          HttpStatus.BAD_REQUEST
        );
      }

      menuData.created_by = userId;
      delete menuData.user_id;
      delete menuData.user_type;
      // Insert menu
      const menu = await this.masterMenuRepository.save(menuData);
      if (menu) {
        const menuAccessData = { created_by: userId, menu_id: menu.id, status };
        if (user_id) menuAccessData['user_id'] = user_id;
        if (user_type) menuAccessData['user_type'] = user_type;
        // Insert menu access
        const menuAccess = await this.masterMenuAccessRepository.save(
          menuAccessData
        );
        if (menuAccess) {
          return {
            message: 'Menu created successfully',
            success: true,
            data: { ...menu, ...menuAccess }
          };
        }
      }
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: e.message,
          success: false
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAMasterMenu(query = {}) {
    const getMenu = await this.masterMenuRepository.findOne(query);
    return getMenu;
  }

  prepareUpdatedDataForMenu(updateMenuDto) {
    const {
      parent_menu_id,
      menu_name,
      menu_order,
      menu_type,
      description,
      menu_icon_class,
      menu_url,
      status
    } = updateMenuDto;
    const updateData = {};
    if (parent_menu_id) {
      updateData['parent_menu_id'] = parent_menu_id;
    }
    if (menu_name) {
      updateData['menu_name'] = menu_name;
    }
    if (menu_order) {
      updateData['menu_order'] = menu_order;
    }
    if (menu_type) {
      updateMenuDto['menu_type'] = menu_type;
    }
    if (description) {
      updateMenuDto['description'] = description;
    }
    if (menu_icon_class) {
      updateMenuDto['menu_icon_class'] = menu_icon_class;
    }
    if (menu_url) {
      updateData['menu_url'] = menu_url;
    }
    if (status === 0 || status === 1) {
      updateData['status'] = status;
    }
    updateData['updated_by'] = GlobalService.userId;

    return updateData;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    try {
      const { sbu_id } = updateMenuDto;
      const menuQuery = { id, sbu_id };
      const getMenu = await this.findAMasterMenu(menuQuery);
      if (!getMenu) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'No menu found to update!',
            success: false
          },
          HttpStatus.NOT_FOUND
        );
      }
      const data = this.prepareUpdatedDataForMenu(updateMenuDto);
      const updatedMenu = await this.masterMenuRepository.update(
        menuQuery,
        data
      );
      if (updatedMenu) {
        return {
          message: 'Menu update successfully',
          success: true
        };
      }
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: e.message,
          success: false
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removeAMenuItem(queryParams: MenuItemDeleteDto) {
    // Todo:: Need to validate delete permission
    try {
      const { id, sbu_id } = queryParams;
      const getMenu = await this.masterMenuRepository.findOne({
        id,
        sbu_id,
        status: 1
      });
      if (!getMenu) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'No menu found to delete!',
            success: false
          },
          HttpStatus.NOT_FOUND
        );
      }
      const deleteMenu = await this.masterMenuRepository.update(
        { id, sbu_id },
        { status: 0 }
      );
      if (deleteMenu) {
        return {
          message: 'Data deleted successfully',
          success: true
        };
      }
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: e.message,
          success: false
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  getNestedChildren(menu, parent) {
    const result = [];
    for (const i in menu) {
      if (menu[i].parent_menu_id === parent) {
        const child = this.getNestedChildren(menu, menu[i].id);
        if (child.length) {
          menu[i].child = child;
        }
        result.push(menu[i]);
      }
    }
    return result;
  }

  // Get Dynamic menu items
  async dynamicMenuItem(getMenuDto) {
    try {
      const { module_id, sbu_id, user_id, user_type } = getMenuDto;

      let menuAccessQuery = '';
      if (!user_id && !user_type) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Missing required field user id or user type',
            success: false
          },
          HttpStatus.BAD_REQUEST
        );
      } else if (user_id && user_type) {
        menuAccessQuery = `(master_menu_access.user_type = ${user_type} OR master_menu_access.user_id = ${user_id})`;
      } else if (user_id) {
        menuAccessQuery = `master_menu_access.user_id = ${user_id}`;
      } else {
        menuAccessQuery = `master_menu_access.user_type = ${user_type}`;
      }

      const menu = await this.masterMenuRepository.query(
        `SELECT master_menu.id,
              master_menu.parent_menu_id,
              master_menu.menu_name,
              master_menu.menu_icon_class,
              master_menu.menu_url
             FROM master_menu
             LEFT JOIN master_menu_access ON
                master_menu.id = master_menu_access.menu_id 
             WHERE master_menu.module_id = ${module_id} AND master_menu.sbu_id = ${sbu_id}
              AND ${menuAccessQuery} AND master_menu_access.status = 1 AND master_menu.status = 1 
              ORDER BY master_menu.menu_order ASC, master_menu.updated_at desc`
      );

      const uniqueMenu = uniqBy(menu, 'id');
      const data = this.getNestedChildren(uniqueMenu, 0);
      return {
        message: 'Data fetched successfully!',
        success: true,
        data
      };
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: e.message,
          success: false
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
