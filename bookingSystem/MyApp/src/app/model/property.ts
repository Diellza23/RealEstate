import { IPropertyBase } from './ipropertybase';
import { Photo } from './photo';

export class Property implements IPropertyBase {
  id: number;
  sellRent: number;
  name: string;
  price: number;
  bhk: number;
  builtArea: number;
  CityId: number;
  city: string;
  image?: string;
  propertyTypeId: number;
  propertyType: string;
  furnishingTypeId: number;
  furnishingType: string;
  carpetArea?: number;
  address: string;
  address2: string;
  floorNo?: string;
  totalFloors?: string;
  readyToMove: boolean;
  age?: string;
  mainEntrance?: string;
  security?: number;
  gated?: boolean;
  maintenance?: number;
  estPossessionOn?: string;
  description?: string;
  country: string;
  photo?: string;
  photos?: Photo[];
  appUserId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  state: string;
}
