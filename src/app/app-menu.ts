import { environment } from 'environments/environment';


const adminRoot = environment.adminRoot;
const permissionsWorkflow = environment.permissionsWorkflow;
const permissionsSetting = environment.permissionsSetting;
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
        to: `${adminRoot}/settings/category`,
        icon: 'simple-icon-list',
        permissions: permissionsSetting,

      },
      {
        label: 'Customer',
        to: `${adminRoot}/settings/customer`,
        icon: 'simple-icon-user',
        permissions: permissionsSetting,
      },
      {
        label: 'Unit',
        to: `${adminRoot}/settings/unit`,
        icon: 'iconsminds-scale',
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
