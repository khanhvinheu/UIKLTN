import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { Taikhoan } from 'src/app/models/taikhoan';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/admin/service/login.service';
import { TaikhoanService } from 'src/app/admin/service/taikhoan.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/admin/service/dialog.service';
import { ProfileService } from 'src/app/admin/service/profile.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  api_url = environment.api_img;
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
    }
    isShow = true;
    currentUser: Taikhoan;
    frm: FormGroup;
    datePipe = new DatePipe('en');
    data:any;
    huyen:any;
    tinh="";
    huyensl="";
    xa:any;
    xasl="";
    diaChihome:"";    
    //duong:any;
    //duongsl="";   
    subscriptions: Subscription[] = [];
    //hoadonxuats: HoaDonXuat[] = [];

    constructor(
        private loginService: LoginService,
        private _formBuilder: FormBuilder,
        //private diadiemService: DiadiemService,
        private userService: TaikhoanService,
        public dialog: MatDialog,
        private dialogService: DialogService,
        private profileSevice: ProfileService
    ) {}

    ngOnInit() {       
        this.loadData();
        this.createForm();        
        //this.frm.controls['diaChi'].setValue((this.currentUser.diaChi).toString());
    }
    loadData() {
        this.subscriptions.push(
            this.loginService.currentUser.subscribe(data => {
                if (data) {
                    this.currentUser = data;
                    const formData = new FormData();
                    formData.append('idUser', data.id + '');
                    this.profileSevice.fetchExportOrder(formData);
                }
            }),
                         
        );
        fetch('./assets/local.json').then(res=>res.json()).then(json=>{     
            const peopleArray = Object.keys(json).map(i => json[i])
            this.data = peopleArray;               
        }); 
    }
    onShowDonHang(e) {
        // this.dialog.open(ChitietdonhangComponent, {
        //     width: '600px',
        //     data: e,
        //     autoFocus: true,
        //     panelClass: 'filter-popup'
        // });
    }
    onChange($event) { 
        const element = this.data.filter(e=>e.name==this.tinh);
        this.huyen=element[0].districts;  
        this.frm.get('diaChi').setValue('TP.'+this.tinh); 
    }  
    onChangexa($event) {   
        const element =  this.huyen.filter(e=>e.name==this.huyensl);        
        this.xa=element[0].wards;
        this.frm.get('diaChi').setValue(this.huyensl+'-TP.'+this.tinh);
        //this.duong=element[0].streets;
        //console.log(element);        
    }
    onChangevaluexa(){
        this.frm.get('diaChi').setValue(this.xasl+'-'+this.huyensl+'-TP.'+this.tinh);
    }
    changeLocation(){       
        this.frm.get('diaChi').setValue(this.diaChihome+'-'+this.xasl+'-'+this.huyensl+'-TP.'+this.tinh);
    }     

    createForm() {
        this.frm = this._formBuilder.group({
            id: [this.currentUser.id],
            hoTen: [
                { value: this.currentUser.hoTen, disabled: this.isShow },
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50),
                    Validators.pattern('[a-zA-Z1-9 ]*')
                ]
            ],
            gioiTinh:[ {value:this.currentUser.gioiTinh,disabled: this.isShow }],
            ngaySinh:[ {value:(new Date(this.currentUser.ngaySinh)).toISOString(),disabled: this.isShow }],
            email: [{ value: this.currentUser.email, disabled: this.isShow }],
            dienThoai: [
                { value: '0'+this.currentUser.dienThoai, disabled: this.isShow }
            ],
            tinh:[{disabled: this.isShow}],          
            huyen:[{disabled: this.isShow}],
            xa:[{disabled: this.isShow}],
            diaChihome:[{ value: ((this.currentUser.diaChi).toString()).split("-").reverse()[3], disabled: this.isShow }],
            diaChi: [{ value: this.currentUser.diaChi, disabled: this.isShow }],  
            //duong:[]
        });
    }
    onToggleShow() {
        this.isShow = !this.isShow;
        if (!this.isShow) {
            this.frm.controls['hoTen'].enable();
            this.frm.controls['gioiTinh'].enable();
            this.frm.controls['ngaySinh'].enable();
            this.frm.controls['dienThoai'].enable();
            this.frm.controls['diaChihome'].enable();
            this.frm.controls['diaChi'].enable();
            this.frm.controls['tinh'].enable();
            this.frm.controls['huyen'].enable();
            this.frm.controls['xa'].enable();
        } else {
            this.frm.controls['hoTen'].disable();
            this.frm.controls['gioiTinh'].disable();
            this.frm.controls['ngaySinh'].disable();
            this.frm.controls['dienThoai'].disable();
            this.frm.controls['diaChi'].disable();
            this.frm.controls['diaChihome'].disable();
            this.frm.controls['tinh'].disable();
            this.frm.controls['huyen'].disable();
            this.frm.controls['xa'].disable();
        }
    }
    onSubmitForm() {        
        const formData = new FormData();
        formData.append('_method', 'put');
        for (const key in this.frm.value) {
            if (key === 'ngaySinh' ) {
                this.frm.value[key] = this.datePipe.transform(
                    this.frm.controls[key].value,
                    'yyyy-MM-dd h:mm:ss'
                );
            }
            formData.append(key, this.frm.value[key]);

        }
        this.subscriptions.push(
            this.userService.update(formData).subscribe(
                data => {
                    this.onToggleShow();
                },
                err => {}
            )
        );
    }
    onChangeHinh(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const formdata = new FormData();
            formdata.append('_method', 'put');
            formdata.append('id', this.currentUser.id + '');
            formdata.append('hinh', file);
            this.userService.update_hinh(formdata).subscribe(data => {
                this.loginService.updateUser(data);
            });
        }
    }
    onDoiMatKhau() {
        this.dialogService.showDoiMatKhau();
    }
    

}
