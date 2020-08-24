import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SanphamService } from '../service/sanpham.service';
import { ConfirmDialogService } from '../service/confirm-dialog.service';
import { DanhmucService } from '../service/danhmuc.service';
import { MatDialog } from '@angular/material/dialog';
import { MobileService } from '../service/mobile.service';
import { Sanpham } from 'src/app/models/sanpham';
import { DanhmucAddComponent } from '../danh-muc/danhmuc-add/danhmuc-add.component';
import { ImageAddComponent } from './image-add/image-add.component';
import { SanphamAddComponent } from './sanpham-add/sanpham-add.component';
import { SanphamEditComponent } from './sanpham-edit/sanpham-edit.component';
import { Nhacungcap } from 'src/app/models/nhacungcap';
import { NhacungcapService } from '../service/nhacungcap.service';
import { AddKhuyenmaiComponent } from './add-khuyenmai/add-khuyenmai.component';
import { NhaphangComponent } from './nhaphang/nhaphang.component';

class FoodNode {
  name: string;
  id: number;
  children?: FoodNode[];
  constructor(name: string, id: number, children?: FoodNode[]) {
      this.name = name;
      this.id = id;
      this.children = children;
  }
}

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.sass']
})
export class SanphamComponent implements OnInit , OnDestroy {
  matches = true;
  api_url = environment.api_img;
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSourceDanhMuc = new MatTreeNestedDataSource<FoodNode>();
  expand = false;
  expandDanhMuc = true;
  isLoading = false;
  columnsToDisplay = this.expand
      ? [
            'id',
            'tenSanpham',
            'Hinh',
            'Gia',
            'SoLuong',
            'KhuyenMai',
            'MoTa',
            'ThongTin',
            'idDanhMuc',
            'Show',
            'created_at',
            'updated_at',
           
        ]
      : [
            'id',
            'tenSanpham',
            'Hinh',
            'Gia',
            'SoLuong',
            'KhuyenMai',
            'idDanhMuc',
            'Show',
            
        ];
  sanphams: any[] = [];
  subscriptions: Subscription[] = [];
  dataSource;
  danhmucs;
  nhasanxuats;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  hasChild = (_: number, node: FoodNode) => {
      return !!node.children && node.children.length > 0;
  };

  constructor(
      private sanphamService: SanphamService,
      private confirmDialogService: ConfirmDialogService,
     // private nhasanxuatService: NhasanxuatService,
      private danhmucService: DanhmucService,
      public dialog: MatDialog,
      private mobileService: MobileService,    
  ) {}

  ngOnInit() {
      this.danhmucService.getAll();
      this.sanphamService.getAll();
      this.loadData();   
  }
  loadData() {
      this.isLoading = true;
      this.subscriptions.push(
          this.mobileService.mobileObs.subscribe(data => {
              this.matches = data;
          }),
          // this.nhasanxuatService.itemObs.subscribe(
          //     data => {
          //         this.nhasanxuats = data;
          //     },
          //     err => {}
          // ),
          this.danhmucService.itemsObs.subscribe(
              data => {
                  this.danhmucs = data;
                  this.transferTree();                
              },
              err => {}
          ),
          this.sanphamService.itemsObs.subscribe(
              data => {
                  if(JSON.parse(localStorage.getItem('currentUser'))['idQuyen']==1){
                  this.sanphams = data;
                  this.dataSource = new MatTableDataSource<any>(
                      this.sanphams
                  );
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  this.isLoading = false;
                 }else if(JSON.parse(localStorage.getItem('currentUser'))['idQuyen']==2){
                    this.sanphams=[];
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];                        
                            
                          if(element.idNhacungcap==JSON.parse(localStorage.getItem('nhacungcap'))['id']){                           
                            const peopleArraya =data[index];                                                 
                            this.sanphams.push(peopleArraya); 
                          }                                              
                      } 
                    this.dataSource = new MatTableDataSource<any>(
                        this.sanphams
                    ); 
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isLoading = false;
                 }
              },
              err => {}
          )
      );
  }
  dequy(idparent) {
      const children: FoodNode[] = [];
      this.danhmucs.forEach(element => {
          if (Number.parseInt(element.danhMuccha) === idparent) {
              const newnode: FoodNode = new FoodNode(
                  element.tenDanhmuc,
                  element.id,
                  this.dequy(element.id)
              );
              children.push(newnode);
          }
      });
      return children;
  }
  transferTree() {
      const TREE_DATA: FoodNode[] = [];
      this.danhmucs.forEach(element => {
          if (element.danhMuccha == null) {
              const newnode: FoodNode = new FoodNode(
                  element.tenDanhmuc,
                  element.id,
                  this.dequy(element.id)
              );
              TREE_DATA.push(newnode);
          }
      });
      this.dataSourceDanhMuc.data = TREE_DATA;
  }
  ngOnDestroy(): void {
      if (this.subscriptions) {
          this.subscriptions.forEach(element => element.unsubscribe());
      }
  }
  onDelete(sanpham) {
      this.confirmDialogService.openDialog().then(result => {
          if (result) {
              this.sanphamService.delete(sanpham);
          }
      });
  }
  findChildDeQuy(id: number, array: number[]) {
      array.push(id);
      this.danhmucs.forEach(element => {
          if (element.idParent === id) {
              array.push(element.id);
              this.findChildDeQuy(element.id, array);
          }
      });
  }
  danhMucFilter(node: FoodNode) {
      const array = [];
      this.findChildDeQuy(node.id, array);
      this.dataSource.filterPredicate = (data: Sanpham, filter: number[]) => {
          return filter.indexOf(data.idDanhMuc) !== -1;
      };
      this.dataSource.filter = array;
  }
  applyFilter(filterValue: string) {
      this.dataSource.filterPredicate = (data: Sanpham, filter: string) =>
          data.tenSanpham.trim()
              .toLowerCase()
              .indexOf(filter) !== -1;
      this.dataSource.filter = filterValue.trim().toLowerCase();     
    //this.dataSource.filter = filterValue.trim().toLowerCase();       
  }
  onExpand() {
      this.expand = !this.expand;
      this.columnsToDisplay = this.expand
          ? [
                'id',
                'tenSanpham',
                'Hinh',
                'SoLuong',
                //'MoTa',
                //'ThongTin',
                'KhuyenMai',
                'idDanhMuc',
                'Gia',
                'Show',
                'created_at',
                'updated_at',
                'action'
            ]
          : [
                'id',
                'tenSanpham',
                'Hinh',
                'SoLuong',
                'KhuyenMai',
                'idDanhMuc',
                'Gia',
                'Show',
                'action'
            ];
  }
  onExpandDanhMuc() {
      this.expandDanhMuc = !this.expandDanhMuc;
  }
  onAdd() {
      const dialogRef = this.dialog.open(SanphamAddComponent, {
          maxWidth: this.matches ? '80%' : '60%',
          width: '100vw',
          maxHeight: this.matches ? '90%' : '90%',
          height: '300vw',
          panelClass: 'panel-sp',
        //   disableClose: true,
        //   hasBackdrop: true,
          data: {
              nhasanxuats: this.nhasanxuats,
              danhmucs: this.danhmucs
          }
      });
  }
  onAddImage(e) {
      const dialogRef = this.dialog.open(ImageAddComponent, {
          maxWidth: this.matches ? '100vw' : '50%',
          width: '80%',

          panelClass: 'panel-sp',
          data: {
              sanpham: e
          }
      });
  }
  onEdit(data) {
      const dialogRef = this.dialog.open(SanphamEditComponent, {
        maxWidth: this.matches ? '80%' : '60%',
        width: '100vw',
        maxHeight: this.matches ? '90%' : '90%',
        height: '300vw',
        panelClass: 'panel-sp',
        //   hasBackdrop: true,
        //   disableClose: true,
          data: {
              sanpham: data,
              danhmucs: this.danhmucs,
              nhasanxuats: this.nhasanxuats
          }
      });
  }
  onOpenThemDanhMuc() {
      const dialogRef = this.dialog.open(DanhmucAddComponent, {
          width: '600px'
      });
  }
  trackByFn(index, item) {
      return index;
  }
  selectable = true;
  removable = true;
  remove(sanpham){      
        const formData = new FormData();
        formData.append('id', sanpham.id);  
        formData.append('idKhuyenmai', '');        
        this.sanphamService.update(formData);
  }
  addKhuyenmai(data){
        const dialogRef = this.dialog.open(AddKhuyenmaiComponent, {
        maxWidth: this.matches ? '98vw' : '25vw',
        minWidth: '320px',
        width: '25%',        
       // panelClass: 'myapp-no-padding-dialog',
        //   hasBackdrop: true,
        //   disableClose: true,
          data: {
              sanpham: data,            
              danhmucs: this.danhmucs,
              nhasanxuats: this.nhasanxuats
          }
      });
  }
  onAddproduct(data){
    const dialogRef = this.dialog.open(NhaphangComponent, {
        maxWidth: this.matches ? '98vw' : '25vw',
        minWidth: '320px',
        width: '25%',        
       // panelClass: 'myapp-no-padding-dialog',
        //   hasBackdrop: true,
        //   disableClose: true,
          data: {
              sanpham: data,            
              danhmucs: this.danhmucs,
              nhasanxuats: this.nhasanxuats
          }
      });
  }

}
