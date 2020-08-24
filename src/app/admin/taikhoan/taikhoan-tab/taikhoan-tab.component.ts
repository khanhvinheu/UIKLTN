import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Taikhoan } from 'src/app/models/taikhoan';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TaikhoanService } from '../../service/taikhoan.service';
import { LoginService } from '../../service/login.service';

class NodeUser {
  user: Taikhoan;
  isShow: boolean;
  constructor (user: Taikhoan, isshow: boolean) {
      this.user = user;
      this.isShow = isshow
  }
}
@Component({
  selector: 'app-taikhoan-tab',
  templateUrl: './taikhoan-tab.component.html',
  styleUrls: ['./taikhoan-tab.component.sass']
})
export class TaikhoanTabComponent implements OnInit {

    currentUser: Taikhoan;
    @Input() idtab: number;
    users: Taikhoan[] = [];
    subscriptions: Subscription[] = []
    nodeUsers: NodeUser[] = []
    columnsToDisplay = ['id', 'Ten', 'Email', 'Admin', 'NhanVien', 'User', 'Action'];
    dataSource;
    isLoading = false
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;
    constructor (
        private taikhoanService: TaikhoanService,
        private loginService: LoginService
    ) { }
    ngOnInit() {
        this.loadData()
        //this.loginService.auth();
        this.taikhoanService.getAll();
    }
    loadData() {
        this.isLoading = true
        this.subscriptions.push(
            this.loginService.currentUser.subscribe(data => {
                this.currentUser = data                   
                
            }, err => { console.log(err) }),
           

            this.taikhoanService.currentUser.subscribe(data => {
                if (Number.parseInt(this.idtab + '') == 0) {
                    this.users = data.filter(e => {
                        return Number.parseInt(e.trangThai + '') === 6
                    })
                } else {
                    this.users = data.filter(e => {
                        return e.idQuyen == this.idtab && Number.parseInt(e.trangThai + '') == 0
                    })
                }

                // this.dataSource = new MatTableDataSource<User>(this.users);
                // this.dataSource.paginator = this.paginator;
                // this.dataSource.sort = this.sort;
                this.nodeUsers = []
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
    onChangeQuyen(e: Taikhoan, idquyen: number) {
        e.idQuyen = idquyen
        var formData = new FormData();
        formData.append('_method', 'put');
        for (var key in e) {
            formData.append(key, e[key]);
        }
        this.subscriptions.push(
            this.taikhoanService.update(formData).subscribe(data => {

            }, err => { console.log(err) })
        )
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
        if (Number.parseInt(item.user.status) === 1) {
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
