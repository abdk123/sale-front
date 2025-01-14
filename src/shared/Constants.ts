export class Constants {
  static permissionsSetting: string[] = [
    // category
    "Setting.Categories",
    "Setting.Categories.Create",
    "Setting.Categories.Edit",
    "Setting.Categories.Delete",

    // Material
    "Setting.Materials",
    "Setting.Materials.Create",
    "Setting.Materials.Edit",
    "Setting.Materials.Delete",

    // Customers
    "Setting.Customers",
    "Setting.Customers.Create",
    "Setting.Customers.Edit",
    "Setting.Customers.Delete",

    // unite
    "Setting.Units",
    "Setting.Units.Create",
    "Setting.Units.Edit",
    "Setting.Units.Delete",

    // Offer
    "Setting.Offers",
    "Setting.Offers.Create",
    "Setting.Offers.Edit",
    "Setting.Offers.Delete",

    // Invoice
    "PurshaseOrder.Invoices",
    "PurshaseOrder.Invoices.Create",
    "PurshaseOrder.Invoices.Edit",
    "PurshaseOrder.Invoices.Delete",
  ];

  static permissionsVoucher: string[] = [
    // Customer Vouchers
    "PurshaseOrder.CustomerVouchers",
    "PurshaseOrder.CustomerVouchers.Create",
    "PurshaseOrder.CustomerVouchers.Edit",
    "PurshaseOrder.CustomerVouchers.Delete",

    // Clearance Company Vouchers
    "PurshaseOrder.ClearanceCompanyVouchers",
    "PurshaseOrder.ClearanceCompanyVouchers.Create",
    "PurshaseOrder.ClearanceCompanyVouchers.Edit",
    "PurshaseOrder.ClearanceCompanyVouchers.Delete",

    // Transport Company Vouchers
    "PurshaseOrder.TransportCompanyVouchers",
    "PurshaseOrder.TransportCompanyVouchers.Create",
    "PurshaseOrder.TransportCompanyVouchers.Edit",
    "PurshaseOrder.TransportCompanyVouchers.Delete",
  ];

  static permissionsUser: string[] = [
    // start security
    // user
    "Security.Users",
    "Security.Users.Create",
    "Security.Users.Edit",
    "Security.Users.Delete",
    "Security.Users.ResetPassword",
    "Security.Users.ChangePermissions",

    // Roles
    "Security.Roles",
    "Security.Roles.Create",
    "Security.Roles.Edit",
    "Security.Roles.Delete",
    //end security
  ];
  static permissionsWorkflow: string[] = [
    //workflow
    "Workflow.Workflow",
    "Workflow.Workflow.Create",
    "Workflow.Workflow.Edit",
    "Workflow.Workflow.Delete",

    //Workflow Steps
    "Workflow.WorkflowStep",
    "Workflow.WorkflowStep.Create",
    "Workflow.WorkflowStep.Edit",
    "Workflow.WorkflowStep.Delete",

    //Workflow Steps Indexes

    "Workflow.StepIndex",
    "Workflow.StepIndex.Create",
    "Workflow.StepIndex.Edit",
    "Workflow.StepIndex.Delete",
  ];
}
