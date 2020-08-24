import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/admin/service/cart.service';

@Component({
  selector: 'app-return-payment',
  templateUrl: './return-payment.component.html',
  styleUrls: ['./return-payment.component.sass']
})
export class ReturnPaymentComponent implements OnInit {
  API = environment.api_url + '/api/admin';
  mess;
  param1;
  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    // this.http.get<any[]>(`${this.API}/return-vnpay`).subscribe(data=>{   
    //   console.log(data);                     
    // });
    this.route.queryParams.subscribe(params => {
      this.param1 = params['vnp_ResponseCode'];
     
    });   
    this.http.get(`${this.API}/return-vnpay`, {
      params: {
        vnp_ResponseCode:this.param1 ,       
      }     
    }).subscribe(data=>{
        this.mess=data;
        this.cartService.clearCart();   
    })   
  }

}
