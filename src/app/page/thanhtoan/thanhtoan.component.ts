import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePageService } from 'src/app/admin/service/home-page.service';
import { CartService } from 'src/app/admin/service/cart.service';
import { ResultValidatorService } from 'src/app/admin/service/result-validator.service';
import { LoginService } from 'src/app/admin/service/login.service';
import { Sanpham } from 'src/app/models/sanpham';
import { Cart } from 'src/app/models/cart';
import { Taikhoan } from 'src/app/models/taikhoan';
import { Subscription } from 'rxjs';
import { HoanthanhthanhtoanComponent } from './hoanthanhthanhtoan/hoanthanhthanhtoan.component';
import { MatVerticalStepper } from '@angular/material/stepper';
import { ThanhtoanService } from 'src/app/admin/service/thanhtoan.service';


@Component({
  selector: 'app-thanhtoan',
  templateUrl: './thanhtoan.component.html',
  styleUrls: ['./thanhtoan.component.sass']
})
export class ThanhtoanComponent implements OnInit,OnDestroy {

  @ViewChild('stepper', { static: true }) stepper: MatVerticalStepper;
  @ViewChild(HoanthanhthanhtoanComponent)
  childHTTT: HoanthanhthanhtoanComponent;
  subscriptions: Subscription[] = [];
  user: Taikhoan;
  carts: Cart[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  tongtien = 0;  
  data:any;
  huyen:any;
  tinh="";
  huyensl="";
  xa:any;
  xasl="";
  diaChihome:"";   
  phuongthucs: string[] = ['COD', 'Thanh toán Online', 'Visa'];
  shownext = true;
  showback = true;
  showdathang = false;
  is_loading = false;
  sanphams: Sanpham[] = [];
  constructor(
      private loginService: LoginService,
      private _formBuilder: FormBuilder,
      //private diadiemService: DiadiemService,
      private resultValidatorService: ResultValidatorService,
      private cartService: CartService,
      //private hoadonxuatService: HoadonxuatService,
      private homePageService: HomePageService,
      private thanhtoanService:ThanhtoanService,
  ) {}
  ngOnInit() {
      this.loadData();
      fetch('./assets/local.json').then(res=>res.json()).then(json=>{     
        const peopleArray = Object.keys(json).map(i => json[i])
        this.data = peopleArray;               
      });
      this.creatForm();
  }
  creatForm() {
      this.firstFormGroup = this._formBuilder.group({
          NguoiNhan: [this.user ? this.user.hoTen : '', [Validators.required]],
          DiaChi: [this.user ? this.user.diaChi : '', [Validators.required]],
          DienThoai: [
              this.user ? Number.parseInt(this.user.dienThoai) : null,
              [Validators.required]
          ],       
          tinh:[''],          
          huyen:[''],
          xa:[''],
          diaChihome:[''],            
      });
      this.secondFormGroup = this._formBuilder.group({
          phuongthuctt: [0, Validators.required]
      });
  }
  ngOnDestroy() {
      if (this.subscriptions) {
          this.subscriptions.forEach(e => e.unsubscribe());
      }
  }
  loadData() {
      this.checkStep(this.stepper.selectedIndex);
      this.subscriptions.push(
          this.loginService.currentUser.subscribe(data => {
              this.user = data;
          }),
         
          this.cartService.cartSubject.subscribe(data => {
              this.carts = data;
          }),
          this.cartService.totalObs.subscribe(data => {
              this.tongtien = data;
          }),
          this.stepper.selectionChange.subscribe(e => {
              this.checkStep(e.selectedIndex);
          }),
          this.homePageService.ProductObs.subscribe(
              data => {
                  this.sanphams = data;
              },
              err => {}
          )
      );
  }
  checkStep(e) {
      if (e === 0) {
          this.showback = false;
          this.showdathang = false;
          this.shownext = true;
      }
      if (e === 1) {
          this.showback = true;
          this.showdathang = false;
          this.shownext = true;
      }
      if (e === 2) {
          this.showback = true;
          this.showdathang = false;
          this.shownext = false;
      }
      if (e === 3) {
          this.showback = false;
          this.showdathang = false;
          this.shownext = false;
      }
      
  }
 
  onChange($event) { 
    const element = this.data.filter(e=>e.name==this.tinh);
    this.huyen=element[0].districts;   
    }  
    onChangexa($event) {   
        const element =  this.huyen.filter(e=>e.name==this.huyensl);        
        this.xa=element[0].wards;
           
    } 
    changeLocation(){       
        this.firstFormGroup.get('DiaChi').setValue(this.diaChihome+'-'+this.xasl+'-'+this.huyensl+'-TP.'+this.tinh);
    } 
  findSanPham(idsanpham: number) {
      if (this.sanphams) {
          return this.sanphams.filter(e => {
              return e.id === idsanpham;
          })[0];
      }
  }
  loadthanhtien() {
      if (this.sanphams) {
          const sumTotal = this.carts.reduce((total, item) => {
              const obj = this.findSanPham(item.idSanPham);
              return obj
                  ? (total += obj.gia * item.SoLuong)
                  : 0;
          }, 0);
          return sumTotal;
      } else {
          return 0;
      }
  }
  onStepChange(e) {
      this.stepper.next();
      //tslint:disable-next-line:no-unused-expression
      this.stepper.disableRipple;
  }
 
  onValidator(controlName: string, status?: boolean) {
      return this.resultValidatorService.getIcon(
          controlName,
          this.firstFormGroup,
          status
      );
  }
  onValidatorBorderColor(controlName: string) {
      return this.resultValidatorService.getBorderColor(
          controlName,
          this.firstFormGroup
      );
  }
  onValidatorTextColor(controlName: string) {
      return this.resultValidatorService.getTextColor(
          controlName,
          this.firstFormGroup
      );
  }
  onValidator2(controlName: string, status?: boolean) {
      return this.resultValidatorService.getIcon(
          controlName,
          this.secondFormGroup,
          status
      );
  }
  onValidatorBorderColor2(controlName: string) {
      return this.resultValidatorService.getBorderColor(
          controlName,
          this.secondFormGroup
      );
  }
  onValidatorTextColor2(controlName: string) {
      return this.resultValidatorService.getTextColor(
          controlName,
          this.secondFormGroup
      );
  }
  onPutChild() {
      this.is_loading = true;
      this.childHTTT.onSubmitThanhToan();
  }  

  onPayment(){
    //this.is_loading = true;
    this.childHTTT.onSubmitPayment();
  }
  onBack() {
       this.stepper.previous();
  }
  onNext() {
       this.stepper.next();
  }

}
