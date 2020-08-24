import { Component, OnInit } from '@angular/core';
import { Taikhoan } from 'src/app/models/taikhoan';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/admin/service/login.service';
import { ResultValidatorService } from 'src/app/admin/service/result-validator.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmPassword } from 'src/app/myvalidator/confirm-password.validator';
import { HeaderPageComponent } from 'src/app/header-page/header-page.component';
import { environment } from 'src/app/environments/environment.prod';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.sass']
})
export class DangkyComponent implements OnInit {
    api_url = environment.api_img;
    hide = true;    
    // reCatcha_status = false;
    reCatcha_status = true;
    currentUser: Taikhoan;
    frm: FormGroup;
    subcriptions: Subscription[] = [];
    error = false;
    error_content = 'Tên đăng nhập hoặc mật khẩu không chính xác';
    datePipe = new DatePipe('en');
    data:any;
    huyen:any;
    tinh="";
    huyensl="";
    xa:any;
    xasl="";
    diaChihome:"";   
    constructor(
        private router: Router,
        private loginService: LoginService,
        private _formBuilder: FormBuilder,
        private resultValidatorService: ResultValidatorService,
        public dialogRef: MatDialogRef<HeaderPageComponent>
    ) {}
    ngOnInit() {
        this.subcriptions.push(
            this.loginService.currentUser.subscribe(data => {
                this.currentUser = data;
            })
        );
        if (this.currentUser) {
            this.router.navigate(['/']);
        }
        fetch('./assets/local.json').then(res=>res.json()).then(json=>{     
            const peopleArray = Object.keys(json).map(i => json[i])
            this.data = peopleArray;               
        });
        this.createForm();
    }
    createForm() {
        this.frm = this._formBuilder.group({
            email: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50),
                    Validators.email
                ]
            ],
            hoTen: ['', [Validators.required]],
            password: ['', [Validators.required]],
            re_password: [
                '',
                [Validators.required, ConfirmPassword.confirmPassword()]
            ],
            dienThoai:['',[Validators.required]],
            tinh:[''],          
            huyen:[''],
            xa:[''],
            diaChihome:[''],
            diaChi: ['',[Validators.required]],  
        });
    }
    onSubmitForm() {
        this.loginService.register(this.frm.value).subscribe(
            data => {
                if (data['error'] === true) {
                    this.error = true;
                    this.error_content = 'Lỗi đăng ký ,xin vui lòng thử lại !';
                    setTimeout(() => {
                        this.error = false;
                    }, 3000);
                } else {
                    if (data['error_email'] === true) {
                        this.error = true;
                        this.error_content = 'Email đã tồn tại !';
                        setTimeout(() => {
                            this.error = false;
                        }, 3000);
                    } else {
                        //this.loginService.updateUser(data.user);
                        this.loginService.login(this.frm.value).subscribe();
                        this.router.navigateByUrl('/');
                        this.onNoClick();
                    }
                }
            },
            err => {
                this.error = true;
                setTimeout(() => {
                    this.error = false;
                }, 3000);
            }
        );
        
         
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
    OnDestroy() {
        if (this.subcriptions) {
            this.subcriptions.forEach(e => e.unsubscribe());
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
        return this.resultValidatorService.getTextColor(controlName, this.frm);
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    public resolved(captchaResponse: string) {
        // this.reCatcha_status = false;
        // if (captchaResponse) {
        //     this.reCatcha_status = true;
        // }
    }
    changeLocation(){       
        this.frm.get('diaChi').setValue(this.diaChihome+'-'+this.xasl+'-'+this.huyensl+'-TP.'+this.tinh);
    }

}
