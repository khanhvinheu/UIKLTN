import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Khuyenmai } from 'src/app/models/khuyenmai';
import { KhuyenmaiService } from '../../service/khuyenmai.service';
import { ResultValidatorService } from '../../service/result-validator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KhuyenmaiComponent } from '../khuyenmai.component';

@Component({
  selector: 'app-khuyenmai-create',
  templateUrl: './khuyenmai-create.component.html',
  styleUrls: ['./khuyenmai-create.component.sass']
})
export class KhuyenmaiCreateComponent implements OnInit, OnDestroy {

  is_loading = false;
    subscriptions: Subscription[] = [];
    Khuyenmai: Khuyenmai = null;
    frm: FormGroup;
    constructor(
        private khuyenmaiService: KhuyenmaiService,
        private resultValidatorService: ResultValidatorService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<KhuyenmaiComponent>,
        @Inject(MAT_DIALOG_DATA) public dataDialog: Khuyenmai
    ) {}
    ngOnInit() {
        this.createForm();
        this.loadData();
    }
    loadData() {
        this.subscriptions.push(
            this.khuyenmaiService.isLoadingObs.subscribe(data => {
                this.is_loading = data;
            })
        );
    }
    createForm() {
        this.frm = this._formBuilder.group({
          tieuDe: [
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
            ],
            noiDungKm: [
              '',
              [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.maxLength(50),
                //   Validators.pattern(
                //       '[ a-zA-Z1-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
                //           'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ]*'
                //   )
              ]
            ],
            chietKhau:[
                '',
                [
                    Validators.required,
                ]
            ]
        });
    }
    onSubmitForm() {
        this.is_loading = true;
        this.khuyenmaiService.createNew(this.frm.value);
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
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => {
                e.unsubscribe();
            });
        }
    }
}
