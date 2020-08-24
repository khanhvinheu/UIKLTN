import { Component, OnInit, Inject } from '@angular/core';
import { Sanpham } from 'src/app/models/sanpham';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChitietkhuyenmaiService } from '../../service/chitietkhuyenmai.service';
import { Chitietkhuyenmai } from 'src/app/models/chitietkhuyenmai';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResultValidatorService } from '../../service/result-validator.service';
import { Subscription } from 'rxjs';
import { SanphamService } from '../../service/sanpham.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-khuyenmai',
  templateUrl: './add-khuyenmai.component.html',
  styleUrls: ['./add-khuyenmai.component.sass']
})
export class AddKhuyenmaiComponent implements OnInit {

  subscriptions: Subscription[] = [];
  sanpham: Sanpham;
  idKhuyenmai:number;
  frmAdd: FormGroup;
  is_loading = false;
  date:any;
  datePipe = new DatePipe('en');
  chirtietKm:Chitietkhuyenmai[]=[];
  constructor(
    private chitietkhuyenmaiServicec: ChitietkhuyenmaiService,
    private _formBuilder: FormBuilder,
    private resultValidatorService: ResultValidatorService,
    private sanphamService: SanphamService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any
  ) { }

  ngOnInit(): void {
    this.sanpham = this.dataDialog.sanpham;
    this.createForm();
    this.loadDate();
  
  }
  loadDate(){
    this.chitietkhuyenmaiServicec.getAll();
    this.chitietkhuyenmaiServicec.itemsObs.subscribe(data=>{
      this.date=new Date().toISOString();
      this.date=this.datePipe.transform(
        this.date,
        'yyyy-MM-dd 12:00:00'
        );         
      this.chirtietKm=data.filter(e=>e.NgayBD<=this.date && e.NgayKT>=this.date && e.idSanPham==this.sanpham.id);  
    })
  }
  createForm() {
    this.frmAdd = this._formBuilder.group({          
        id: [this.sanpham.id,[Validators.required]],
        idKhuyenmai:['',[Validators.required]],          
    });
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
  onSubmitForm() {     
        this.is_loading = true;
        const formData = new FormData();
        for (const key in this.frmAdd.value) {
            formData.append(key, this.frmAdd.value[key]);
        }
        this.sanphamService.update(formData); 
        this.is_loading = false;        
  }
  ngOnDestroy(): void {
      if (this.subscriptions) {
          this.subscriptions.forEach(subscription =>
              subscription.unsubscribe()
          );
      }
  }

}
