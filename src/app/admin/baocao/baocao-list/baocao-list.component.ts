import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-baocao-list',
  templateUrl: './baocao-list.component.html',
  styleUrls: ['./baocao-list.component.sass']
})
export class BaocaoListComponent implements OnInit, OnDestroy {
  api_url = environment.api_url
    ngOnDestroy(): void {

  }
  constructor() { }

  ngOnInit(): void {
  }

}
