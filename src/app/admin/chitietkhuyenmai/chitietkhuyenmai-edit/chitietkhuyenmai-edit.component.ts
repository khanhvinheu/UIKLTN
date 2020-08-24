import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chitietkhuyenmai } from 'src/app/models/chitietkhuyenmai';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ChitietkhuyenmaiService } from '../../service/chitietkhuyenmai.service';
import { ThongbaoService } from '../../service/thongbao.service';
import { ResultValidatorService } from '../../service/result-validator.service';
import { ChitietkhuyenmaiComponent } from '../chitietkhuyenmai.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KhuyenmaiService } from '../../service/khuyenmai.service';
import { DatePipe } from '@angular/common';
import * as MESS from '../../../constants';

@Component({
  selector: 'app-chitietkhuyenmai-edit',
  templateUrl: './chitietkhuyenmai-edit.component.html',
  styleUrls: ['./chitietkhuyenmai-edit.component.sass']
})
export class ChitietkhuyenmaiEditComponent implements OnInit, OnDestroy {
    [x: string]: any;

    subscriptions: Subscription[] = [];
    danhmuchinhs: Chitietkhuyenmai[] = [];
    frm: FormGroup;
    sanphams = [];
    khuyenmais = [];
    Chitietkhuyenmai: Chitietkhuyenmai;
    filename = '';
    datePipe = new DatePipe('en');
    file: File;
    is_loading = false;
    ngaybd:any;
    ngaykt:any;   
    date:any;  
    datenow:any; 
    constructor(
        private chitietkhuyenmaiService: ChitietkhuyenmaiService,
        private khuyenmaiService:KhuyenmaiService,
        private _formBuilder: FormBuilder,
        private thongBaoService: ThongbaoService,
        private resultValidatorService: ResultValidatorService,
        public dialogRef: MatDialogRef<ChitietkhuyenmaiComponent>,
        @Inject(MAT_DIALOG_DATA) public dataDialog: any
    ) { }
    ngOnInit() {        
        this.sanphams = this.dataDialog.sanphams;
        this.Chitietkhuyenmai = this.dataDialog.Chitietkhuyenmai;                
        this.createForm();
        this.loadData();       
        this.date = new Date().toISOString(); 
        this.date=this.datePipe.transform(
            this.date,
            'yyyy-MM-dd'
        );          
       
        this.datenow=new Date(this.date).toISOString();      
    }
    loadData() {
        this.subscriptions.push(
            this.khuyenmaiService.itemsObs.subscribe(data => {
                this.khuyenmais = data; 
              }),
            this.chitietkhuyenmaiService.isLoadingObs.subscribe(data => {
                this.is_loading = data;
            })
        );       
        this.frm.controls['NgayBD'].setValue((new Date(this.Chitietkhuyenmai.NgayBD)).toISOString());
        this.frm.controls['NgayKT'].setValue((new Date(this.Chitietkhuyenmai.NgayKT)).toISOString());
    }
    createForm() {
        this.frm = this._formBuilder.group({
            id: [this.Chitietkhuyenmai.id, []],           
            idSanPham: [this.Chitietkhuyenmai.idSanPham, []],
            idKhuyenMai:[this.Chitietkhuyenmai.idKhuyenMai,[Validators.required]],
            NgayBD: [(new Date(this.Chitietkhuyenmai.NgayBD)).toISOString(), [Validators.required]],
            NgayKT: [(new Date(this.Chitietkhuyenmai.NgayKT)).toISOString(), [Validators.required]]
        });
        
    }
    onSubmitForm() {
      this.is_loading = true;      
      const formData = new FormData();
      for (const key in this.frm.value) {
          if (key === 'NgayBD' || key === 'NgayKT') {
              this.frm.value[key] = this.datePipe.transform(
                  this.frm.controls[key].value,
                  'yyyy-MM-dd h:mm:ss'
              );
          }
          formData.append(key, this.frm.value[key]);
      }          
      if((Date.parse( this.frm.value['NgayBD']) >= Date.parse( this.date) )&& (Date.parse( this.frm.value['NgayKT']) >= Date.parse( this.frm.value['NgayBD']))){
        this.chitietkhuyenmaiService.update(formData);        
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
    onFileChange(e) {
        if (e.target.files.length > 0) {
            this.file = e.target.files[0];
            this.filename = this.file.name;
            this.frm.get('hinhAnh').setValue(this.file);
        }
    }
    onReset() {
        this.frm.controls['id'].setValue(this.Chitietkhuyenmai.id);
        this.frm.controls['idSanPham'].setValue(this.Chitietkhuyenmai.idSanPham);
        this.frm.controls['idKhuyenMai'].setValue(this.Chitietkhuyenmai.idKhuyenMai);
        this.frm.controls['NgayBD'].setValue((new Date(this.Chitietkhuyenmai.NgayBD)).toISOString());
        this.frm.controls['NgayKT'].setValue((new Date(this.Chitietkhuyenmai.NgayKT)).toISOString());
        
    }
    onValidator(controlName: string, status?: boolean) {
        return this.resultValidatorService.getResult(
            controlName,
            this.frm,
            status
        );
    }
    onValidatorBorderColor(controlName: string) {
        return this.resultValidatorService.getBorderColor(
            controlName,
            this.frm
        );
    }
    onValidatorTextColor(controlName: string) {
        return this.resultValidatorService.getTextColor(controlName, this.frm);
    }

}
