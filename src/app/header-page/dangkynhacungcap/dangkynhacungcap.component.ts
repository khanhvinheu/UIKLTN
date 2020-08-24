import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-dangkynhacungcap',
  templateUrl: './dangkynhacungcap.component.html',
  styleUrls: ['./dangkynhacungcap.component.sass']
})
export class DangkynhacungcapComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  api_url = environment.api_img;
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
