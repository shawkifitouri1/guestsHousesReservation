import { UploadFileStatus } from 'ng-zorro-antd/upload/interface';

export interface GuestHouseImage {
  uid:string;
  name: string;
  status: UploadFileStatus;
  url:string;
}
