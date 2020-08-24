import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NhasanxuatService } from 'src/app/admin/service/nhasanxuat.service';
import { NhaSanXuat } from 'src/app/models/nhasanxuat';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment.prod';

@Component({
  selector: 'app-blog-nsx',
  templateUrl: './blog-nsx.component.html',
  styleUrls: ['./blog-nsx.component.sass']
})
export class BlogNsxComponent implements OnInit {
  api_url = environment.api_img;
  subscriptions: Subscription[] = [];
  nhasanxuats:NhaSanXuat[]=[];
  constructor(
    private nhasanxuatService: NhasanxuatService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.nhasanxuatService.getAll();
    this.loadData();
  }
  loadData() {
    this.subscriptions.push(
        
        this.nhasanxuatService.itemsObs.subscribe(data=>{
            this.nhasanxuats=data;          
        }),
    );
   
  }
  onClickDanhMuc(e) {
    this.router.navigate(['/search'], { queryParams: { hangsanxuat: e.id } });
  }

}
