import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NhaSanXuat } from 'src/app/models/nhasanxuat';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResultValidatorService } from '../../service/result-validator.service';
import { NhasanxuatService } from '../../service/nhasanxuat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nhasanxuat-edit',
  templateUrl: './nhasanxuat-edit.component.html',
  styleUrls: ['./nhasanxuat-edit.component.sass']
})
export class NhasanxuatEditComponent implements OnInit {

  subcriptions: Subscription[] = [];
  frmEdit: FormGroup;
  is_loading = false;
  constructor(
      private nhasanxuatService: NhasanxuatService,
      private resultValidatorService: ResultValidatorService,
      private _formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public dataReturn: NhaSanXuat
  ) {}
  ngOnInit() {
      this.createForm();
      this.loadData();
  }
  loadData() {
      this.subcriptions.push(
          this.nhasanxuatService.isLoadingObs.subscribe(data => {
              this.is_loading = data;
          })
      );
  }
  createForm() {
      this.frmEdit = this._formBuilder.group({
          id: [this.dataReturn.id],
          Ten: [
              this.dataReturn.Ten,
              [
                  Validators.required,
                  Validators.maxLength(50),
                  Validators.minLength(2),
                  Validators.pattern(
                      '[ a-zA-Z1-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
                          'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ]*'
                  )
              ]
          ]
      });
  }
  onSubmitForm() {
      const formData = new FormData();
      formData.append('_method', 'put');
      for (const key in this.frmEdit.value) {
          formData.append(key, this.frmEdit.value[key]);
      }
      this.nhasanxuatService.update(formData);
  }
  ngOnDestroy() {
      if (this.subcriptions) {
          this.subcriptions.forEach(e => e.unsubscribe());
      }
  }
  onReset() {
      this.frmEdit.controls['Ten'].setValue(this.dataReturn.Ten);
  }

  onValidator(controlName: string, status?: boolean) {
      return this.resultValidatorService.getResult(
          controlName,
          this.frmEdit,
          status
      );
  }
  onValidatorBorderColor(controlName: string) {
      return this.resultValidatorService.getBorderColor(
          controlName,
          this.frmEdit
      );
  }
  onValidatorTextColor(controlName: string) {
      return this.resultValidatorService.getTextColor(
          controlName,
          this.frmEdit
      );
  }

}
