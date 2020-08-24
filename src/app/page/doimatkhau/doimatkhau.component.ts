import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Taikhoan } from 'src/app/models/taikhoan';
import { Password_reset } from 'src/app/models/password_reset';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaikhoanService } from 'src/app/admin/service/taikhoan.service';
import { ResultValidatorService } from 'src/app/admin/service/result-validator.service';
import { ConfirmPassword } from 'src/app/myvalidator/confirm-password.validator';
import { PasswordResetService } from 'src/app/admin/service/password-reset.service';

@Component({
  selector: 'app-doimatkhau',
  templateUrl: './doimatkhau.component.html',
  styleUrls: ['./doimatkhau.component.sass']
})
export class DoimatkhauComponent implements OnInit {

  isshow = false;
  subscriptions: Subscription[] = [];
  users: Taikhoan[] = [];
  password_resets: Password_reset[] = [];
  token: string;
  frm: FormGroup;
  password_reset: Password_reset;
  isThanhCong = false;
  mess: string;
  constructor(
      private activatedRoute: ActivatedRoute,
      private userService: TaikhoanService,
      private passwordResetService: PasswordResetService,
      private router: Router,
      private _formBuilder: FormBuilder,
      private resultValidatorService: ResultValidatorService
  ) {}

  ngOnInit() {
      this.loaddata();
      this.createForm();
  }
  async loaddata() {
      this.subscriptions.push(
          await this.activatedRoute.params.subscribe(data => {
              this.token = data.token;
          }),
          this.userService.currentUser.subscribe(data => {
              this.users = data.slice();
          }),
          this.passwordResetService.currentPR.subscribe(data => {
              this.password_resets = data.slice();
              this.password_reset = this.password_resets.filter(e => {
                  return e.token === this.token;
              })[0];
              if (this.password_reset) {
                  this.isshow = true;
                  this.frm.controls['email'].setValue(
                      this.password_reset.email
                  );
              } else {
              }
          })
      );
  }
  createForm() {
      this.frm = this._formBuilder.group({
          email: [{ value: '', disabled: true }, [Validators.required]],
          password: ['', [Validators.required]],
          re_password: [
              '',
              [Validators.required, ConfirmPassword.confirmPassword()]
          ]
      });
  }
  onSubmitForm() {
      const formdata = new FormData();
      formdata.append('email', this.frm.controls['email'].value);
      formdata.append('password', this.frm.controls['password'].value);
      formdata.append('token', this.token);
      this.passwordResetService.reset(formdata).subscribe(data => {
          if (data['error'] === false) {
              this.isThanhCong = true;
              this.mess = 'Đổi mật khẩu thành công';
          } else {
              this.mess = ' Xảy ra lỗi, vui lòng thử lại';
          }
      });
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

}
