import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/admin/service/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent implements OnInit {

  subscriptions: Subscription[] = [];
    loading = false;
    constructor(private loadingService: LoadingService) {}

    ngOnInit() {
        this.subscriptions.push(
            this.loadingService.LoadingObs.subscribe(data => {
                this.loading = data;
            })
        );
    }

}
