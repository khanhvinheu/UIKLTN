import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { Taikhoan } from 'src/app/models/taikhoan';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/admin/service/login.service';
import { TaikhoanService } from 'src/app/admin/service/taikhoan.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/admin/service/dialog.service';
import { ProfileService } from 'src/app/admin/service/profile.service';
import { NccDetailService } from 'src/app/admin/service/ncc-detail.service';
import { ActivatedRoute } from '@angular/router';
import { Nhacungcap } from 'src/app/models/nhacungcap';
import { NhacungcapService } from 'src/app/admin/service/nhacungcap.service';
import { ResultValidatorService } from 'src/app/admin/service/result-validator.service';

@Component({
  selector: 'app-profile-ncc',
  templateUrl: './profile-ncc.component.html',
  styleUrls: ['./profile-ncc.component.sass']
})
export class ProfileNccComponent implements OnInit {

    api_url = environment.api_img;
    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe());
        }
    }
    isShow = true;
    currentUser: Taikhoan;
    nhacungcaps:Nhacungcap;
    frm: FormGroup;
    datePipe = new DatePipe('en');
    data:any;
    huyen:any;
    tinh="";
    huyensl="";
    xa:any;
    xasl="";
    diaChihome:""; 
    ckeConfig: any;    
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
        private profileSevice: ProfileService,
        private nccdetailService: NccDetailService,
        private nhacungcapService:NhacungcapService,
        private activatedRoute : ActivatedRoute,
        private resultValidatorService: ResultValidatorService,

    ) {}
    loadEditor() {
        this.ckeConfig = {
            customConfig: 'custom/config.js'
        };
    }
    ngOnInit() {  
            
        this.loadData();
        this.createForm();   
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

        this.nccdetailService.ProductDetailObs.subscribe(data => {         
            this.nhacungcaps = data;      
        }),  
        this.activatedRoute.params.subscribe(data => {
            this.nccdetailService.FetchProduct(
                JSON.parse(localStorage.getItem('nhacungcap'))['id']
            );       
        })  
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
            id: [JSON.parse(localStorage.getItem('nhacungcap'))['id']],
            tenNhacungcap: [
                { value: JSON.parse(localStorage.getItem('nhacungcap'))['tenNhacungcap'], disabled: this.isShow },
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50),
                    Validators.pattern('[a-zA-Z1-9 ]*')
                ]
            ],           
           
            email: [{ value: JSON.parse(localStorage.getItem('nhacungcap'))['email'], disabled: this.isShow }],
            soDienthoai: [
                { value:"0"+ JSON.parse(localStorage.getItem('nhacungcap'))['soDienthoai'], disabled: this.isShow }
            ],
            tinh:[{disabled: this.isShow}],          
            huyen:[{disabled: this.isShow}],
            xa:[{disabled: this.isShow}],
            diaChihome:[{ value: ((this.currentUser.diaChi).toString()).split("-").reverse()[3], disabled: this.isShow }],
            diaChi: [{ value: JSON.parse(localStorage.getItem('nhacungcap'))['diaChi'], disabled: this.isShow }],  
            moTa: [JSON.parse(localStorage.getItem('nhacungcap'))['moTa'],{disabled: this.isShow }, [Validators.required]],
            thongTin: [JSON.parse(localStorage.getItem('nhacungcap'))['thongTin'],{disabled: this.isShow }, [Validators.required]],
        });
    }
    onToggleShow() {
        this.isShow = !this.isShow;
        if (!this.isShow) {
            this.frm.controls['email'].enable();
            this.frm.controls['tenNhacungcap'].enable();  
            this.frm.controls['soDienthoai'].enable();
            this.frm.controls['diaChihome'].enable();
            this.frm.controls['diaChi'].enable();
            this.frm.controls['tinh'].enable();
            this.frm.controls['huyen'].enable();
            this.frm.controls['xa'].enable();
            this.frm.controls['moTa'].enable();
            this.frm.controls['thongTin'].enable();
        } else {
            this.frm.controls['email'].disable();
            this.frm.controls['tenNhacungcap'].disable(); 
            this.frm.controls['soDienthoai'].disable();
            this.frm.controls['diaChi'].disable();
            this.frm.controls['diaChihome'].disable();
            this.frm.controls['tinh'].disable();
            this.frm.controls['huyen'].disable();
            this.frm.controls['xa'].disable();
            this.frm.controls['moTa'].disable();
            this.frm.controls['thongTin'].disable();
        }
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
        return this.resultValidatorService.getTextColor(
            controlName,
            this.frm
        );
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
        this.nhacungcapService.update(formData);
        this.onToggleShow(); 
    }
    onChangeHinh(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const formdata = new FormData();
            formdata.append('_method', 'put');
            formdata.append('id', this.nhacungcaps.id + '');
            formdata.append('hinh', file);
            this.nccdetailService.update_hinh(formdata);
          
        }
    }
    onDoiMatKhau() {
        this.dialogService.showDoiMatKhau();
    }
    

}
