import { Component, OnInit } from '@angular/core';
import { NccDetailService } from 'src/app/admin/service/ncc-detail.service';
import { Subscription } from 'rxjs';
import { Nhacungcap } from 'src/app/models/nhacungcap';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-chitietnhacungcap',
  templateUrl: './chitietnhacungcap.component.html',
  styleUrls: ['./chitietnhacungcap.component.sass']
})
export class ChitietnhacungcapComponent implements OnInit {
  textShow = false;
  subscriptions: Subscription[] = [];
  nhacungcaps:Nhacungcap;
  api_url = environment.api_img;
  constructor(
    private activatedRoute: ActivatedRoute,
    private nccdetailService:NccDetailService

  ) { }

  ngOnInit(): void {
     this.loadData();
  }
  loadData(){ 
      this.nccdetailService.ProductDetailObs.subscribe(data => {         
              this.nhacungcaps = data;              
      }),  
      this.activatedRoute.params.subscribe(data => {
          this.nccdetailService.FetchProduct(
              this.activatedRoute.params['value'].id
          );       
      })    
    }

}
