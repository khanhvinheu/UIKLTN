import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { Subscription, from } from 'rxjs';
import { DanhMuc } from 'src/app/models/danhmuc';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DanhmucService } from '../../service/danhmuc.service';
import { SanphamService } from '../../service/sanpham.service';
import { ResultValidatorService } from '../../service/result-validator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SanphamComponent } from '../sanpham.component';
import { ImageValidator } from 'src/app/myvalidator/image.validator';
import { Sanpham } from 'src/app/models/sanpham';
import { ThongbaoService } from '../../service/thongbao.service';
import { NhacungcapService } from '../../service/nhacungcap.service';
import { Nhacungcap } from 'src/app/models/nhacungcap';
import { NhasanxuatService } from '../../service/nhasanxuat.service';
import { NhaSanXuat } from 'src/app/models/nhasanxuat';
// import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { element } from 'protractor';

@Component({
  selector: 'app-sanpham-edit',
  templateUrl: './sanpham-edit.component.html',
  styleUrls: ['./sanpham-edit.component.sass']
})
export class SanphamEditComponent implements OnInit {

    subscriptions: Subscription[] = [];
    danhmucs: DanhMuc[] = this.dataDialog.danhmucs;
    danhmucShows:DanhMuc[];
    dm: DanhMuc[];
    Sldanhmuc:number;
    //danhmucShows:DanhMuc[];  
    nhasanxuats:NhaSanXuat[];
    danhmucselect:DanhMuc[];  
    nhacungcaps:Nhacungcap[];   
    frm: FormGroup;
    frmUp: FormGroup;
    error: boolean = null;    
    file: File;
    filename = '';
    sanpham: Sanpham;
    ckeConfig: any;    
    is_loading = false;
    loadEditor() {
        this.ckeConfig = {
            customConfig: 'custom/config.js'
        };
    }
    constructor(
        private danhmucService: DanhmucService,
        private nhacungcapService:NhacungcapService,
        private sanphamService: SanphamService,
        private _formBuilder: FormBuilder,
        private thongBaoService: ThongbaoService,
        private resultValidatorService: ResultValidatorService,
        private nhasanxuatService: NhasanxuatService,
        public dialogRef: MatDialogRef<SanphamComponent>,

        @Inject(MAT_DIALOG_DATA) public dataDialog: any
    ) {}
    ngOnInit() {
        this.nhasanxuatService.getAll();
        this.sanpham = this.dataDialog.sanpham;
        this.filename = this.sanpham.hinhAnh;
        this.nhacungcapService.getAll();
        this.loadData();
        this.createForm();
    }
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(element => element.unsubscribe());
        }
    }
    loadData() {
        this.subscriptions.push(
            this.danhmucService.itemsObs.subscribe(
                data => {
                    this.dm=data;
                    this.danhmucs = data.filter(e=>e.danhMuccha == null);
                    this.danhmucShows=data; 
                //   this.danhmucShows=[]; 
                //   for (let index = 0; index < this.danhmucs.length; index++) {
                //     const element = this.danhmucs[index];     
                //       if(element.danhMuccha){                           
                //         const peopleArraya =this.danhmucs[index];                                                 
                //         this.danhmucShows.push(peopleArraya); 
                //       }                                              
                //   }      
                },
                () => {}
            ),
            this.nhacungcapService.itemsObs.subscribe(
                data=>{
                    this.nhacungcaps=data;  
                }
            ),   
            this.sanphamService.isLoadingObs.subscribe(data => {
                this.is_loading = data;
            }),
            this.nhasanxuatService.itemsObs.subscribe(data=>{
                this.nhasanxuats=data;
            }),
        );
    }
    createForm() {
        this.frmUp = this._formBuilder.group({
            idDanhMucs: [this.sanpham.idDanhMuc, [Validators.required]],
        });
        this.frm = this._formBuilder.group({
            id: [this.sanpham.id, []],
            tenSanpham: [
              this.sanpham.tenSanpham,
              [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.maxLength(50),
                  Validators.pattern(
                      '[ a-zA-Z1-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
                      'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ]*'
                  )
              ]
          ],
          gia: [this.sanpham.gia, [Validators.required]],           
          idDanhMuc: [this.sanpham.idDanhMuc, [Validators.required]],
          soLuong: [this.sanpham.soLuong, [Validators.required, Validators.min(0)]],
          idNhacungcap: [this.sanpham.idNhacungcap, [Validators.required]],
          hinhAnh: [
              this.sanpham.hinhAnh,
              [
                  Validators.required,
                  ImageValidator.imageSizeValidator(2000000),
                  ImageValidator.imageExtensionValidator([
                      'image/jpeg',
                      'image/png'
                  ])
              ]
          ],
          moTa: [this.sanpham.moTa, [Validators.required]],
          thongTin: [this.sanpham.thongTin, [Validators.required]],
          idNSX: [this.sanpham.idNSX, [Validators.required]],
        });
        this.frm.controls['hinhAnh'].setErrors({ '': '' });
    }
    onSubmitForm() {
        this.is_loading = true;
        const formData = new FormData();
        formData.append('_method', 'put');
        for (const key in this.frm.value) {
            if (
                key === 'hinhAnh' &&
                typeof this.frm.controls['hinhAnh'].value === 'string'
            ) {
            } else {
                formData.append(key, this.frm.value[key]);
            }
        }
        this.sanphamService.update(formData);
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
    onFileChange(e) {
        if (e.target.files.length > 0) {
            this.file = e.target.files[0];
            this.filename = this.file.name;
            this.frm.get('hinhAnh').setValue(this.file);
        }
    }
    onBack() {
        this.dialogRef.close();
    }
    onChange($event) { 
        const element = this.danhmucShows.filter(e=>e.danhMuccha==this.Sldanhmuc);
        this.danhmucselect=element;
        console.log(this.Sldanhmuc);
           
    }  
    

}
