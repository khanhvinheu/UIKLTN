import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.prod';
import { MatDialog } from '@angular/material/dialog';



@Injectable({
    providedIn: 'root'
})
export class ThanhtoanService {
    dataUrl:any;
    API = environment.api_url + '/api/admin';
    constructor(public http: HttpClient,
        public dialog: MatDialog,
        ) {}
    submitOrder(formData): Observable<any> {
        return this.http.post<any>(`${this.API}/submit-order`, formData);
    }    
    submitOrderPaymnent(formData) {
        return this.http.post<any[]>(`${this.API}/thanhtoan`, formData).subscribe(data=>{           
           //alert(data['data']);
           // this.dialog.open(PaymentComponent, {
               //     width: '400px',
               //     data: data['data']
               // })                 
            window.open(data['data'], '_blank'); 
            //window.open(data['data'], "myWindow", "width=700,height=700");  
            
                          
        }); 
    }    
}
