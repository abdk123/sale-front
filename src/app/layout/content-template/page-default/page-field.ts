export interface IPageField{
    label: string;
    type: string;
    name?: string | undefined;
    format?: string | undefined;
    sortable: boolean,
    compoundValue?: string | undefined;
    templateValue?: string | undefined;
    referenceTextField?: string | undefined;
    enumValue?:IEnumValue[];
}

export interface IEnumValue{
    value: number;
    text: string;
}

export interface IPageDetail {
  label: string;
  cssClass?: string;
  icon?: string;
  route: string;
}


export interface IPageMenu {
  label: string;
  cssClass?: string;
  icon?: string;
  name: string;
  permission?: string;
}
