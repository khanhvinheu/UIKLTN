import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NhacungcapService } from 'src/app/admin/service/nhacungcap.service';
import { ResultValidatorService } from 'src/app/admin/service/result-validator.service';
import { ImageValidator } from 'src/app/myvalidator/image.validator';
import { TaikhoanService } from 'src/app/admin/service/taikhoan.service';
import { tick } from '@angular/core/testing';
import { LoginService } from 'src/app/admin/service/login.service';
import { Taikhoan } from 'src/app/models/taikhoan';
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from 'src/app/admin/service/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-dangkynhacungcap',
  templateUrl: './form-dangkynhacungcap.component.html',
  styleUrls: ['./form-dangkynhacungcap.component.sass']
})
export class FormDangkynhacungcapComponent implements OnInit {
    datePipe = new DatePipe('en');
    data:any;
    huyen:any;
    tinh="";
    huyensl="";
    xa:any;
    xasl="";
    diaChihome:"";   
    api_url = environment.api_img;
    hide = true;
    subcriptions: Subscription[] = [];
    file: File;
    filename = '';
    frmAdd: FormGroup;
    frmUpdate: FormGroup;
    error: boolean = null;
    is_loading = false;
    currentUser: Taikhoan;    
    constructor(
        private nhaCungCapService: NhacungcapService,
        private resultValidatorService: ResultValidatorService,
        private _formBuilder: FormBuilder,
        private taikhoanService: TaikhoanService,
        private loginService: LoginService,
        public dialogRef: MatDialogRef<FormDangkynhacungcapComponent>,       
        private router: Router
        //@Inject(MAT_DIALOG_DATA) public dataReturn: NhaCungCap        
    ) {}
    ngOnInit() {
        this.createForm();
        this.loadData();
    }
    loadData() {
        this.subcriptions.push(
            this.nhaCungCapService.isLoadingObs.subscribe(data => {
                this.is_loading = data;
            })
        );     
        this.loginService.currentUser.subscribe(
            data => {
                this.currentUser = data;
            },
            err => {}            
            
        );
        fetch('./assets/local.json').then(res=>res.json()).then(json=>{     
            const peopleArray = Object.keys(json).map(i => json[i])
            this.data = peopleArray;               
        });
    }
    createForm() {
        this.frmAdd = this._formBuilder.group({         
          tenNhacungcap: [
                '',
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
          diaChi:['',Validators.required],
          soDienthoai:['',[Validators.required]],
          email:['',
                    [
                        Validators.required,
                        Validators.minLength(2),
                        Validators.maxLength(50),
                        Validators.email
                    ]
                ],
          hinhAnh: [
            '',
            [
                Validators.required,
                ImageValidator.imageSizeValidator(2000000),
                ImageValidator.imageExtensionValidator([
                    'image/jpeg',
                    'image/png'
                ])
            ]
          ],
          idTaiKhoan:[JSON.parse(localStorage.getItem('currentUser'))['id']],
          trangThai:[6],   
          tinh:[''],          
          huyen:[''],
          xa:[''],
          diaChihome:[''],     
        });
        this.frmUpdate=this._formBuilder.group({
          id:[JSON.parse(localStorage.getItem('currentUser'))['id']],
          trangThai:[6],
        });
        
    }
    onSubmitForm() {        
        const formData = new FormData();
        for (const key in this.frmAdd.value) {
            formData.append(key, this.frmAdd.value[key]);
        }        
        this.nhaCungCapService.createNew(formData); 
                   
        formData.append('_method', 'put');
        for (var key in this.frmUpdate.value) {            
            formData.append(key, this.frmUpdate.value[key]);
        }   
       
        this.subcriptions.push(
            this.taikhoanService.updateTrangthai(formData).subscribe(data => {
                this.router.navigateByUrl('/profile');  
                this.onNoClick();     
            }, err => { console.log(err) }),  
        )     
            
        
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
    ngOnDestroy() {
        if (this.subcriptions) {
            this.subcriptions.forEach(e => e.unsubscribe());
        }
    }
    

    onFileChange(e) {
        if (e.target.files.length > 0) {
            this.file = e.target.files[0];
            this.filename = this.file.name;
            this.frmAdd.get('hinhAnh').setValue(this.file);  
        }
    }
    onChange($event) { 
        const element = this.data.filter(e=>e.name==this.tinh);
        this.huyen=element[0].districts;
    }  
    onChangexa($event) {   
        const element =  this.huyen.filter(e=>e.name==this.huyensl);        
        this.xa=element[0].wards;
        
        //this.duong=element[0].streets;
        //console.log(element);        
    }
    changeLocation(){       
        this.frmAdd.get('diaChi').setValue(this.diaChihome+'-'+this.xasl+'-'+this.huyensl+'-TP.'+this.tinh);
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}
