import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResultValidatorService } from '../../service/result-validator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhuongthucthanhtoanComponent } from '../phuongthucthanhtoan.component';
import { Quyen } from 'src/app/models/quyen';
import { PtttService } from '../../service/pttt.service';
import { Pttt } from 'src/app/models/pptt';

@Component({
  selector: 'app-pttt-edit',
  templateUrl: './pttt-edit.component.html',
  styleUrls: ['./pttt-edit.component.sass']
})
export class PtttEditComponent implements OnInit {

    is_loading = false;
    subscriptions: Subscription[] = [];
    pttt: Pttt = null;
    frm: FormGroup;
    constructor(
        private ptttService: PtttService,
        private resultValidatorService: ResultValidatorService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<PhuongthucthanhtoanComponent>,
        @Inject(MAT_DIALOG_DATA) public dataDialog: Pttt
    ) {}
    ngOnInit() {
        this.pttt = this.dataDialog;
        this.createForm();
    }
    loadData() {
        this.subscriptions.push(
            this.ptttService.isLoadingObs.subscribe(data => {
                this.is_loading = data;
            })
        );
    }
    createForm() {
        this.frm = this._formBuilder.group({
            id: [this.pttt.id],
            tenPhuongthuc: [
                this.pttt.tenPhuongthuc,
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50),
                    Validators.pattern(
                        '[ a-zA-Z1-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
                            'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ]*'
                    )
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
        this.ptttService.update(formData);
        this.is_loading = false;

        // console.log(this.frm.value.tenPhuongthuc);
        
    }
    onReset() {
        this.frm.controls['tenPhuongthuc'].setValue(this.pttt.tenPhuongthuc);
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
