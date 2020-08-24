import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sanpham } from 'src/app/models/sanpham';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ResultValidatorService } from '../../service/result-validator.service';
import { SanphamService } from '../../service/sanpham.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nhaphang',
  templateUrl: './nhaphang.component.html',
  styleUrls: ['./nhaphang.component.sass']
})
export class NhaphangComponent implements OnInit {
  sanpham: Sanpham;  
  frmAdd: FormGroup;
  is_loading = false;
  subscriptions: Subscription[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private _formBuilder: FormBuilder,   
    private resultValidatorService: ResultValidatorService,
    private sanphamService: SanphamService,
  ) { }

  ngOnInit(): void {
    this.sanpham = this.dataDialog.sanpham;  
    this.createForm();  
    
  }
  createForm() {
    this.frmAdd = this._formBuilder.group({          
        id: [this.sanpham.id,[Validators.required]],
        soLuong:['',[Validators.required,Validators.min(0)]],       
        soLuonght:[this.sanpham.soLuong,[Validators.required]]
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
        formData.append('id',this.frmAdd.value['id']);
        formData.append('soLuong',this.frmAdd.value['soLuong']+this.sanpham.soLuong);

        // for (const key in this.frmAdd.value) {
        //     formData.append(key, this.frmAdd.value[key]);
        //    // formData.append(key,this.frmAdd.value['soLuong']='10')
        // }
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
