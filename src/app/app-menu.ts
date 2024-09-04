import { environment } from "environments/environment";

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
        label: "Store",
        to: `${adminRoot}/settings/store`,
        icon: "iconsminds-clothing-store",
        permissions: permissionsSetting,
      },
      {
        label: "Category",
        to: `${adminRoot}/settings/category`,
        icon: "simple-icon-list",
        permissions: permissionsSetting,
      },
      {
        label: "Size",
        to: `${adminRoot}/settings/unit`,
        icon: "iconsminds-scale",
        permissions: permissionsSetting,
      },
      {
        label: "Material",
        to: `${adminRoot}/settings/material`,
        icon: "iconsminds-shopping-basket",
        permissions: permissionsSetting,
      },

      
      {
        label: "Customer",
        to: `${adminRoot}/settings/customer`,
        icon: "simple-icon-user",
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
        label: "Employees",
        to: `${adminRoot}/hr/employees`,
        icon: "simple-icon-user",
        permissions: permissionsSetting,
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
          label: "PurchaseInvoices",
          to: `${adminRoot}/orders/invoices`,
          icon: "bi bi-receipt",
          permissions: permissionsSetting,
        },
        {
          label: "ReveivingMaterials",
          to: `${adminRoot}/orders/receives`,
          icon: "bi bi-box-arrow-in-down",
          permissions: permissionsSetting,
        },
        {
          label: "Deliveries",
          icon: "bi bi-truck",
          permissions: permissionsSetting,
          to: ``,
          subs: [
            {
              label: "DeliveriesList",
              to: `${adminRoot}/orders/deliveries`,
              icon: "",
              permissions: permissionsSetting,
            },
            {
              label: "DeliveryManagement",
              to: `${adminRoot}/orders/manage-delivery`,
              icon: "",
              permissions: permissionsSetting,
            },
            {
              label: "ReturnedDeliveries",
              to: `${adminRoot}/orders/returned-deliveries`,
              icon: "bi bi-receipt",
              permissions: permissionsSetting,
            },
            {
              label: "RejectedDeliveries",
              to: `${adminRoot}/orders/rejected-deliveries`,
              icon: "bi bi-receipt",
              permissions: permissionsSetting,
            },
          ],
        },
        {
          label: "SaleInvoices",
          icon: "bi bi-truck",
          permissions: permissionsSetting,
          to: `1`,
          subs: [
            {
              label: "ConvertSaleInvoices",
              to: `${adminRoot}/orders/convert-sale-invoices`,
              icon: "bi bi-receipt",
              permissions: permissionsSetting,
            },
            {
              label: "SaleInvoiceList",
              to: `${adminRoot}/orders/sale-invoices`,
              icon: "bi bi-receipt",
              permissions: permissionsSetting,
            },
            
          ],
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
