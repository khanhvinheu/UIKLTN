import { Component, OnInit, ViewChild } from '@angular/core';
import { Taikhoan } from 'src/app/models/taikhoan';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TaikhoanService } from '../service/taikhoan.service';

class NodeUser {
  user: Taikhoan;
  isShow: boolean;
  constructor (user: Taikhoan, isshow: boolean) {
    this.user = user;
    this.isShow = isshow
  }
}

@Component({
  selector: 'app-taikhoan',
  templateUrl: './taikhoan.component.html',
  styleUrls: ['./taikhoan.component.sass']
})
export class TaikhoanComponent implements OnInit {

  public users: Taikhoan[] = [];
  public subscriptions: Subscription[] = []
  nodeUsers: NodeUser[] = []
  columnsToDisplay = ['id', 'Ten', 'Email', 'Admin', 'NhanVien', 'User', 'Action'];
  dataSource;
  isLoading = false
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  constructor (
    private taikhoanService: TaikhoanService,
  ) { }

  ngOnInit() {
    this.loadData()
  }
  loadData() {
    this.isLoading = true
    this.subscriptions.push(
      this.taikhoanService.currentUser.subscribe(data => {
        this.users = data
        this.users.forEach(e => {
          this.nodeUsers.push(new NodeUser(e, true))
        })
        this.dataSource = new MatTableDataSource<NodeUser>(this.nodeUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false
      }, err => { console.log(err) }).add(() => { })
    )

  }
  onChangeQuyen(e: Taikhoan, idQuyen: number) {
    e.idQuyen = idQuyen
    var formData = new FormData();
    formData.append('_method', 'put');
    for (var key in e) {
      formData.append(key, e[key]);
    }
    this.subscriptions.push(
      this.taikhoanService.update(formData).subscribe(data => {
        console.log(data)
      }, err => { console.log(err) })
    )
  }
  changeStatus(status) {
    console.log(status)
    status = !status;
  }
  onSaveRow(item) {
    var formData = new FormData();
    formData.append('_method', 'put');
    for (var key in item.user) {
      formData.append(key, item.user[key]);
    }
    this.subscriptions.push(
      this.taikhoanService.update(formData).subscribe(data => {
        item.isShow = !item.isShow
      }, err => { console.log(err) })
    )
  }
  onLock(item) {
    if (item.user.status === 1) {
      item.user.status = 0
    }
    else {
      item.user.status = 1
    }
    var formData = new FormData();
    formData.append('_method', 'put');
    for (var key in item.user) {
      formData.append(key, item.user[key]);
    }
    this.subscriptions.push(
      this.taikhoanService.update(formData).subscribe(data => {
      }, err => { console.log(err) })
    )
  }
  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(e => e.unsubscribe())
    }


  }

}
