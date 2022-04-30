export interface IPropertyBase{
  Id: number;
  SellRent:number;
  Name: string;
  FType: string;
  PType: string;
  Price: number;
  BHK:number;
  BuiltArea: number;
  City:string;
  RTM:boolean;
  Image?: string;
  estPossessionOn?: string;
}
