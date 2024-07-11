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

