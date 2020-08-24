import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Khuyenmai } from 'src/app/models/khuyenmai';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KhuyenmaiService } from '../../service/khuyenmai.service';
import { ResultValidatorService } from '../../service/result-validator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KhuyenmaiComponent } from '../khuyenmai.component';

@Component({
  selector: 'app-khuyenmai-edit',
  templateUrl: './khuyenmai-edit.component.html',
  styleUrls: ['./khuyenmai-edit.component.sass']
})
export class KhuyenmaiEditComponent implements OnInit, OnDestroy {

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
        this.Khuyenmai = this.dataDialog;
        this.createForm();
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
            id: [this.Khuyenmai.id],
            tieuDe: [
              this.Khuyenmai.tieuDe,
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
            this.Khuyenmai.noiDungKm,
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
          chietKhau:[
            this.Khuyenmai.chietKhau,
            [
                Validators.required,
            ]
          ]
        });
    }
    onSubmitForm() {
        this.is_loading = true;
        const formData = new FormData();
        formData.append('_method', 'put');
        for (const key in this.frm.value) {
            formData.append(key, this.frm.value[key]);
        }
        this.khuyenmaiService.update(formData);
        this.is_loading = false;
    }
    onReset() {
        this.frm.controls['tieuDe'].setValue(this.Khuyenmai.tieuDe);
        this.frm.controls['noiDungKm'].setValue(this.Khuyenmai.noiDungKm);     
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
