import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Chitietkhuyenmai } from 'src/app/models/chitietkhuyenmai';
import { ChitietkhuyenmaiService } from '../../service/chitietkhuyenmai.service';
import { ThongbaoService } from '../../service/thongbao.service';
import { ResultValidatorService } from '../../service/result-validator.service';
import { ChitietkhuyenmaiComponent } from '../chitietkhuyenmai.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageValidator } from 'src/app/myvalidator/image.validator';
import { SanphamService } from '../../service/sanpham.service';
import { KhuyenmaiService } from '../../service/khuyenmai.service';
import { DatePipe } from '@angular/common';
import * as MESS from '../../../constants';

@Component({
  selector: 'app-chitietkhuyenmai-create',
  templateUrl: './chitietkhuyenmai-create.component.html',
  styleUrls: ['./chitietkhuyenmai-create.component.sass']
})
export class ChitietkhuyenmaiCreateComponent implements OnInit {

  subscriptions: Subscription[] = [];
  Chitietkhuyenmais: Chitietkhuyenmai[] = [];
  frmAdd: FormGroup;
  sanphams = [];
  khuyenmais = [];
  filename = '';
  file: File;
  datePipe = new DatePipe('en');
  is_loading = false;
  ngaybd:any;
  ngaykt:any;  
  date:any;
  ngayht:any;
  constructor(
      
      private chitietkhuyenmaiService: ChitietkhuyenmaiService,
      private _formBuilder: FormBuilder,
      private khuyenmaiService:KhuyenmaiService,
      private thongBaoService: ThongbaoService,
      private resultValidatorService: ResultValidatorService,
      public dialogRef: MatDialogRef<ChitietkhuyenmaiComponent>,
      @Inject(MAT_DIALOG_DATA) public dataReturn: any
  ) {}
  ngOnInit() {
      this.sanphams = this.dataReturn.sanphams;          
      this.createForm();
      this.loadData();             
      //get time not 
      this.date=new Date().toISOString();   
      
      this.date=this.datePipe.transform(
          this.date,
            'yyyy-MM-dd h:mm:ss'
          );
      this.ngayht=new Date().toISOString();
         
  }
  loadData() {
      this.subscriptions.push(
        this.khuyenmaiService.itemsObs.subscribe(data => {
          this.khuyenmais = data; 
        }),
          this.chitietkhuyenmaiService.isLoadingObs.subscribe(data => {
              this.is_loading = data;
          }),          
      );
      
  }
  createForm() {
      this.frmAdd = this._formBuilder.group({          
          idSanPham: ['', [Validators.required]],
          idKhuyenMai:['',[Validators.required]],
          NgayBD: ['', [Validators.required]],
          NgayKT: ['', [Validators.required]]          
      });
  }
  onSubmitForm() {
     
      this.is_loading = true;      
      const formData = new FormData();
      for (const key in this.frmAdd.value) {
          if (key === 'NgayBD' || key === 'NgayKT') {
              this.frmAdd.value[key] = this.datePipe.transform(
                  this.frmAdd.controls[key].value,
                  'yyyy-MM-dd '
              );
          }
          formData.append(key, this.frmAdd.value[key]);
      }
      if((Date.parse( this.frmAdd.value['NgayBD']) >= Date.parse( this.date) )&& (Date.parse( this.frmAdd.value['NgayKT']) >= Date.parse( this.frmAdd.value['NgayBD']))){
        this.chitietkhuyenmaiService.createNew(formData);
        
      }  
     
      else{
          this.thongBaoService.open(
            MESS.Date_Failed,
            'bg-danger'
        );  
        this.is_loading = false; 
      }
     
        
  }
  ngOnDestroy(): void {
      if (this.subscriptions) {
          this.subscriptions.forEach(subscription =>
              subscription.unsubscribe()
          );
      }
  }
 
  onValidator(controlName: string, status?: boolean) {
      return this.resultValidatorService.getResult(
          controlName,
          this.frmAdd,
          status
      );
  }
  onValidatorBorderColor(controlName: string) {
      return this.resultValidatorService.getBorderColor(
          controlName,
          this.frmAdd
      );
  }
  onValidatorTextColor(controlName: string) {
      return this.resultValidatorService.getTextColor(
          controlName,
          this.frmAdd
      );
  }

}
