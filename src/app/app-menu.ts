import { environment } from 'environments/environment';


const adminRoot = environment.adminRoot;
const permissionsWorkflow = environment.permissionsWorkflow;
const permissionsSetting = environment.permissionsSetting;
const permissionsVoucher = environment.permissionsVoucher;
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
    icon: "simple-icon-settings",
    label: "Settings",
    to: `${adminRoot}/settings`,
    permissions: permissionsSetting,
    subs: [
      {
        label: "Material",
        to: `${adminRoot}/settings/material`,
        icon: "iconsminds-shopping-basket",
        permissions: permissionsSetting,
      },

      {
        label: "Store",
        to: `${adminRoot}/settings/store`,
        icon: "iconsminds-clothing-store",
        permissions: permissionsSetting,
      },

      {
        label: "ClearanceCompany",
        to: `${adminRoot}/settings/clearanceCompany`,
        icon: "iconsminds-empire-state-building",
        permissions: permissionsSetting,
      },

      {
        label: "TransportCompany",
        to: `${adminRoot}/settings/transportCompany`,
        icon: "iconsminds-building",
        permissions: permissionsSetting,
      },

      {
        label: "Category",
        to: `${adminRoot}/settings/category`,
        icon: "simple-icon-list",
        permissions: permissionsSetting,
      },
      {
        label: "Customer",
        to: `${adminRoot}/settings/customer`,
        icon: "simple-icon-user",
        permissions: permissionsSetting,
      },
      {
        label: "Size",
        to: `${adminRoot}/settings/unit`,
        icon: "iconsminds-scale",
        permissions: permissionsSetting,
      },
    ],
  },

  //Vouchers
  {
    icon: "simple-icon-book-open",
    label: "Vouchers",
    to: `${adminRoot}/vouchers`,
    permissions: permissionsVoucher,
    subs: [
      {
        label: "TransportCompanyVoucher",
        to: `${adminRoot}/vouchers/transport-company-voucher`,
        icon: "iconsminds-book",
        permissions: permissionsVoucher,
      },
      {
        label: "ClearanceCompanyVoucher",
        to: `${adminRoot}/vouchers/clearance-company-voucher`,
        icon: "iconsminds-book",
        permissions: permissionsVoucher,
      },
      {
        label: "CustomerVoucher",
        to: `${adminRoot}/vouchers/customer-voucher`,
        icon: "iconsminds-book",
        permissions: permissionsVoucher,
      },
    ],
  },
  //Offers
  {
    icon: "simple-icon-layers",
    label: "Orders",
    to: `${adminRoot}/orders`,
    permissions: permissionsSetting,
    subs: [
      {
        label: "Offers",
        to: `${adminRoot}/orders/offers`,
        icon: "iconsminds-address-book-2",
        permissions: permissionsSetting,
      },
      {
        label: "Invoices",
        to: `${adminRoot}/orders/invoices`,
        icon: "iconsminds-calendar-4",
        permissions: permissionsSetting,
      },
    ],
  },
  //Security
  {
    icon: "iconsminds-security-settings",
    label: "Security",
    to: `${adminRoot}/security`,
    permissions: permissionsUser,
    subs: [
      {
        label: "Role",
        to: `${adminRoot}/security/role`,
        icon: "iconsminds-lock-2",
        permissions: permissionsUser,
      },
      {
        label: "User",
        to: `${adminRoot}/security/user`,
        icon: "iconsminds-business-man-woman",
        permissions: permissionsUser,
      },
    ],
  },
  //WorkFlow
  {
    icon: "iconsminds-recycling-2",
    label: "WorkFlow",
    to: `${adminRoot}/workflow`,
    permissions: permissionsWorkflow,
    subs: [
      {
        label: "WorkFlow",
        to: `${adminRoot}/workflow/workflow`,
        icon: "iconsminds-recycling-2",
        permissions: permissionsWorkflow,
      },
    ],
  },
];
export default data;
