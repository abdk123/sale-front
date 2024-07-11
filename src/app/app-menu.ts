import { environment } from 'environments/environment';


const adminRoot = environment.adminRoot;
const permissionsProduction = environment.permissionsProduction;
const permissionsWorkflow = environment.permissionsWorkflow;
const permissionsSetting = environment.permissionsSetting;
const permissionsWarehouse = environment.permissionsWarehouse;
const permissionsUser = environment.permissionsUser;

export interface IMenuItem {
  id?: string;
  icon?: string;
  label: string;
  to: string;
  newWindow?: boolean;
  permissions?: string[];
  subs?: IMenuItem[];

}

const data: IMenuItem[] = [
  //Production
  {
    icon: 'iconsminds-factory',
    label: 'Production',
    to: `${adminRoot}/production`,
    permissions: permissionsProduction,
    subs: [
      {
        label: 'Plan',
        to: `${adminRoot}/production/plan`,
        icon: 'iconsminds-address-book-2',
        permissions: permissionsProduction,
      },
      {
        label: 'Actually',
        to: `${adminRoot}/production/diallyProduction`,
        icon: 'simple-icon-notebook',
        permissions: permissionsProduction,
      },
      {
        label: 'DailyProduction',
        to: `${adminRoot}/production/diallyProduction/list`,
        icon: 'simple-icon-clock',
        permissions: permissionsProduction,
      },
    ],
  },

  //Warehouse
  {
    label: 'Warehouses',
    to: `${adminRoot}/warehouses`,
    icon: 'iconsminds-factory-1',
    permissions: permissionsWarehouse,
    subs: [
      {
        label: 'Stock',
        to: `${adminRoot}/warehouses/warehouseMaterial`,
        icon: 'iconsminds-shopping-basket',
        permissions: permissionsWarehouse,

      },
      {
        label: 'Warehouse',
        to: `${adminRoot}/warehouses/warehouse`,
        icon: 'iconsminds-fire-staion',
        permissions: permissionsWarehouse,

      },
      {
        label: 'OutputRequest',
        to: `${adminRoot}/warehouses/outputRequest`,
        icon: 'iconsminds-check',
        permissions: permissionsWarehouse,

      },
    ],

  },
  //Setting
  {
    icon: 'simple-icon-settings',
    label: 'Settings',
    to: `${adminRoot}/settings`,
    permissions: permissionsSetting,
    subs: [
      {
        label: 'Material',
        to: `${adminRoot}/settings/material`,
        icon: 'iconsminds-shopping-basket',
        permissions: permissionsSetting,

      },

      {
        label: 'Category',
        to: `${adminRoot}/settings/Category`,
        icon: 'simple-icon-list',
        permissions: permissionsSetting,

      },
      {
        label: 'Product',
        to: `${adminRoot}/settings/product`,
        icon: 'simple-icon-layers',
        permissions: permissionsSetting,

      },
      {
        label: 'Supplier',
        to: `${adminRoot}/settings/supplier`,
        icon: 'simple-icon-user',
        permissions: permissionsSetting,
      },
      {
        label: 'Unit',
        to: `${adminRoot}/settings/unit`,
        icon: 'iconsminds-scale',
        permissions: permissionsSetting,
      },
      {
        label: 'Transfer',
        to: `${adminRoot}/settings/transfer`,
        icon: 'iconsminds-synchronize',
        permissions: permissionsSetting,
      },
      {
        label: 'WorkFlowStepIndex',
        to: `${adminRoot}/settings/WorkFlowStepIndex`,
        icon: 'simple-icon-event',
        permissions: permissionsSetting,


      },
      {
        label: 'GeneralSetting',
        to: `${adminRoot}/settings/generalsetting`,
        icon: 'simple-icon-globe',
        permissions: permissionsSetting,
      },
    ],

  },
  //Security
  {
    icon: 'iconsminds-security-settings',
    label: 'Security',
    to: `${adminRoot}/security`,
    permissions: permissionsUser,
    subs: [
      {
        label: 'Role',
        to: `${adminRoot}/security/role`,
        icon: 'iconsminds-lock-2',
        permissions: permissionsUser,
      },
      {
        label: 'User',
        to: `${adminRoot}/security/user`,
        icon: 'iconsminds-business-man-woman',
        permissions: permissionsUser,
      },

    ],
  },

  //WorkFlow
  {
    icon: 'iconsminds-recycling-2',
    label: 'WorkFlow',
    to: `${adminRoot}/workflow`,
    permissions: permissionsWorkflow,
    subs: [
      {
        label: 'WorkFlow',
        to: `${adminRoot}/workflow/workflow`,
        icon: 'iconsminds-recycling-2',
        permissions: permissionsWorkflow,
      },


    ],
  },

];
export default data;
