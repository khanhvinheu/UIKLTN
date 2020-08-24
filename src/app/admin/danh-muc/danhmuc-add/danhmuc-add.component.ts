import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DanhMuc } from 'src/app/models/danhmuc';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DanhmucService } from '../../service/danhmuc.service';
import { ResultValidatorService } from '../../service/result-validator.service';
import { DanhmucListComponent } from '../danhmuc-list/danhmuc-list.component';
import { MatDialogRef } from '@angular/material/dialog';
import { toArray } from 'rxjs/operators';

@Component({
  selector: 'app-danhmuc-add',
  templateUrl: './danhmuc-add.component.html',
  styleUrls: ['./danhmuc-add.component.sass']
})
export class DanhmucAddComponent implements OnInit {
  is_loading = false;
  public subscriptions: Subscription[] = [];
  public danhmucs: DanhMuc[] = [];
  public danhmucCha: DanhMuc[] = [];
  public frmAdd: FormGroup;
  constructor(
      private danhmucService: DanhmucService,
      private _formBuilder: FormBuilder,
      private resultValidatorService: ResultValidatorService,
      public dialogRef: MatDialogRef<DanhmucListComponent>
  ) {}

  ngOnInit(): void {
        this.createForm();
        this.subscriptions.push(
            this.danhmucService.itemsObs.subscribe(
                data => {
                    this.danhmucs = data;   
                },
                () => {}
            )
        );
        for (let index = 0; index < this.danhmucs.length; index++) {
            const element = this.danhmucs[index];     
            if(!element.danhMuccha){   
                const peopleArraya =this.danhmucs[index];                            
                this.danhmucCha.push(peopleArraya); 
            }  
        }          
  }
  createForm() {
    this.frmAdd = this._formBuilder.group({
        tenDanhmuc: [
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
        danhMuccha: ['', []],
        hinh: [
            '',
            [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50),
                // Validators.pattern(
                //     '[ a-zA-Z1-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
                //         'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ]*'
                // )
            ]
        ]
    });
}
onSubmitForm() {
    this.danhmucService.createNew(this.frmAdd.value);
}
ngOnDestroy() {
    if (this.subscriptions) {
        this.subscriptions.forEach(e => e.unsubscribe());
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
