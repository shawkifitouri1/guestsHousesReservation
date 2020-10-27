import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { GuestHouseImage } from './../image.interface';
import { Component, Input, OnInit } from '@angular/core';
import { NzShowUploadList,
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadListType,
  NzUploadTransformFileType,
  NzUploadType,
  NzUploadXHRArgs,
  UploadFilter ,
  ZipButtonOptions} from 'ng-zorro-antd/upload';
import { Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { filter } from 'rxjs/operators';
/*-----------------------------------*/

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    console.log('reader result',reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html'
})
export class UploadImagesComponent  {
  // file: NzUploadFile;
  uploading=false
  @Input() isModifiyng: boolean; // decorate the property with @Input()

  @Input() ModifyingFileList: GuestHouseImage[] ;
  fileList: NzUploadFile[] = [];
  //   {
  //     uid: '-1',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  //   },
  //   {
  //     uid: '-2',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  //   },
  //   {
  //     uid: '-3',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  //   },
  //   {
  //     uid: '-4',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  //   },
  //   {
  //     uid: '-5',
  //     name: 'image.png',
  //     status: 'error'
  //   }
  // ];
  previewImage: string | undefined = '';
  previewVisible = false;
  constructor(private http: HttpClient, private msg: NzMessageService) {}

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };





  handleChange(info: NzUploadChangeParam): void {
    info.fileList.forEach(file=>{console.log('file',file.url)});
    let fileList = [...info.fileList];

    // // 1. Limit the number of uploaded files
    // // Only to show two recent uploaded files, and old ones will be replaced by the new
    // fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    console.log('*******',fileList);

    // this.fileList = fileList;
  }







// *****************************************
beforeUpload = (file: NzUploadFile): boolean => {
  this.fileList = this.fileList.concat(file);
  return false;
};
handleUpload(): void {
  const formData = new FormData();
  // tslint:disable-next-line:no-any
  this.fileList.forEach((file: any) => {
    formData.append('files[]', file);
  });
  this.uploading = true;
  // You can use any AJAX library you like
  const req = new HttpRequest('POST', 'https://www.mocky.io/v2/5cc8019d300000980a055e76', formData, {
    // reportProgress: true
  });
  this.http
    .request(req)
    .pipe(filter(e => e instanceof HttpResponse))
    .subscribe(
      () => {
        this.uploading = false;
        this.fileList = [];
        this.msg.success('upload successfully.');
      },
      () => {
        this.uploading = false;
        this.msg.error('upload failed.');
      }
    );
}
// *****************************************



  checkUpload(event) {

    this.ModifyingFileList.push({
        uid   : event.file.uid,
        name  : event.file.name,
        status: event.file.status,
        url   : event.file.response.data[0].path_url
    });
    this.fileList.push({
      uid   : event.file.uid,
      name  : event.file.name,
      status: event.file.status,
      url   : event.file.response.data[0].path_url
  });

     }

}
