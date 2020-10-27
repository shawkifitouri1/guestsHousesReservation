import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { GuestsHousesListComponent } from './guests-houses-list/guests-houses-list.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AddGuestHouseFormComponent } from './add-guest-house-form/add-guest-house-form.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { UploadImagesComponent } from './upload-images/upload-images.component';

import { NzMessageModule } from 'ng-zorro-antd/message';

// import { NgZorroAntdModule } from 'ng-zorro-antd';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    GuestsHousesListComponent,
    AddGuestHouseFormComponent,
    DeleteConfirmComponent,
    UploadImagesComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzListModule,
    NzPopconfirmModule,
    NzModalModule,
    NzFormModule,NzMessageModule,
    ReactiveFormsModule,NzSpaceModule,
    CommonModule,NzTableModule,NzDividerModule,NzUploadModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
