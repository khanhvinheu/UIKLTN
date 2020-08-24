import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Taikhoan } from 'src/app/models/taikhoan';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TaikhoanService } from '../../service/taikhoan.service';
import { LoginService } from '../../service/login.service';
import { NhacungcapService } from '../../service/nhacungcap.service';
import { Nhacungcap } from 'src/app/models/nhacungcap';
import { ConfirmDialogService } from '../../service/confirm-dialog.service';

class NodeUser {
  nhacungcap: Nhacungcap;
  isShow: boolean;
  constructor (nhacungcap: Nhacungcap, isshow: boolean) {
      this.nhacungcap = nhacungcap;
      this.isShow = isshow
  }
}
@Component({
  selector: 'app-nhacungcap-list',
  templateUrl: './nhacungcap-list.component.html',
  styleUrls: ['./nhacungcap-list.component.sass']
})
export class NhacungcapListComponent implements OnInit {

    currentUser: Taikhoan;
    @Input() idtab: number;
    users: Taikhoan[] = [];
    nhacungcaps:Nhacungcap[]=[];
    subscriptions: Subscription[] = []
    nodeUsers: NodeUser[] = []
    columnsToDisplay = ['id', 'Ten', 'Email','NhanVien' ];
    dataSource;
    isLoading = false
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;
    constructor (
        private taikhoanService: TaikhoanService,
        private loginService: LoginService,
        private nhacungcapService:NhacungcapService,
        private confirmDialogService: ConfirmDialogService
    ) { }
    ngOnInit() {
        this.loadData()
        //this.loginService.auth();
        this.nhacungcapService.getAll();
    }
    loadData() {
        this.isLoading = true
        this.subscriptions.push(
            this.loginService.currentUser.subscribe(data => {
                this.currentUser = data                   
                
            }, err => { console.log(err) }),
           

            // this.taikhoanService.currentUser.subscribe(data => {
            //     if (Number.parseInt(this.idtab + '') == 0) {
            //         this.users = data.filter(e => {
            //             return Number.parseInt(e.trangThai + '') === 6
            //         })
            //     } else {
            //         this.users = data.filter(e => {
            //             return e.idQuyen == this.idtab && Number.parseInt(e.trangThai + '') == 0
            //         })
            //     }

            //     // this.dataSource = new MatTableDataSource<User>(this.users);
            //     // this.dataSource.paginator = this.paginator;
            //     // this.dataSource.sort = this.sort;
            //     this.nodeUsers = []
            //     this.users.forEach(e => {
            //         this.nodeUsers.push(new NodeUser(e, true))
            //     })
            //     this.dataSource = new MatTableDataSource<NodeUser>(this.nodeUsers);
            //     this.dataSource.paginator = this.paginator;
            //     this.dataSource.sort = this.sort;
            //     this.isLoading = false
            // }, err => { console.log(err) }).add(() => { })
            this.nhacungcapService.itemsObs.subscribe(data=>{
              if(Number.parseInt(this.idtab + '')==0){
                this.nhacungcaps=data.filter(e=>{
                  return e.idQuyen == 3 && Number.parseInt(e.trangThai + '') === 7
                })
              }
              else if(Number.parseInt(this.idtab + '')==2){
                this.nhacungcaps = data.filter(e => {
                    return  e.idQuyen == 2 && Number.parseInt(e.trangThai + '') == 1
                })
              }
              else 
              {
                this.nhacungcaps = data.filter(e => {                    
                    return e.idQuyen == 3 && Number.parseInt(e.trangThai + '') == 6
                })
              }
                // this.dataSource = new MatTableDataSource<User>(this.users);
                // this.dataSource.paginator = this.paginator;
                // this.dataSource.sort = this.sort;
                this.nodeUsers = []
                this.nhacungcaps.forEach(e => {
                    this.nodeUsers.push(new NodeUser(e, true))
                })
                this.dataSource = new MatTableDataSource<NodeUser>(this.nodeUsers);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.isLoading = false
            }, err => { console.log(err) }).add(() => { })
        )
    }
    onChangeQuyen(e: Nhacungcap, idquyen: number,trangThaitk:number,trangThai:number) {     
        e.idQuyen=idquyen;
        e.trangThaitk=trangThaitk;    
        e.trangThai=trangThai;
        var formData = new FormData();
        formData.append('_method', 'put');
        for (var key in e) {
            formData.append(key, e[key]);
        }     
        this.nhacungcapService.updateQuyen(formData);       
    }   

    onLock(e: Nhacungcap) {
        if (Number.parseInt(e.trangThai+'') === 7) {
            e.trangThai= 1,
            e.idQuyen = 2,
            e.trangThaitk= 0;
        }
        else {
            e.trangThai = 7,
            e.idQuyen = 3,
            e.trangThaitk= 0;
        }
        
          
        var formData = new FormData();
        formData.append('_method', 'put');
        for (var key in e) {
            formData.append(key, e[key]);
        }     
        this.nhacungcapService.updateQuyen(formData); 
        
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach(e => e.unsubscribe())
        }
    }
    onDelete(e: Nhacungcap, idquyen: number,trangThaitk:number,trangThai:number) {
        this.confirmDialogService.openDialogwr().then(result => {
            if (result) {
                e.idQuyen=idquyen;
                e.trangThaitk=trangThaitk;    
                e.trangThai=trangThai;
                var formData = new FormData();
                formData.append('_method', 'put');
                for (var key in e) {
                    formData.append(key, e[key]);
                }     
                this.nhacungcapService.updateQuyen(formData);  
                this.nhacungcapService.delete(e);
            }
        });
    }

}
