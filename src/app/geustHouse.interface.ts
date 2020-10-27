import { GuestHouseImage } from './image.interface';
import { NzUploadFile } from 'ng-zorro-antd/upload';
export interface GuestHouse {
  id?: number;
  name: string;
  description: string ;
  location : string ;
  // constractor(){}

  imagesList?:GuestHouseImage[];
}
