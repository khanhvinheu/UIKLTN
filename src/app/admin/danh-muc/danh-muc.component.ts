import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DanhMuc } from 'src/app/models/danhmuc';
import { Subscription } from 'rxjs';
import { DanhmucService } from '../service/danhmuc.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from '../service/confirm-dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { DanhmucAddComponent } from './danhmuc-add/danhmuc-add.component';
import { DanhmucEditComponent } from './danhmuc-edit/danhmuc-edit.component';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

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
  selector: 'app-danh-muc',
  templateUrl: './danh-muc.component.html',
  styleUrls: ['./danh-muc.component.sass']
})
export class DanhMucComponent implements OnInit,OnDestroy {
  matches = true;
  expand = false;
  expandDanhMuc = true;
  columnsToDisplay = this.expand
        ? ['id', 'ten', 'parent',]
        : ['id', 'ten', 'parent',];
  danhmucs: DanhMuc[] = [];
  subscriptions: Subscription[] = [];
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSourceDanhMuc = new MatTreeNestedDataSource<FoodNode>();
  dataSource;
  isLoading = false;
  //paginator: any;
 // sort: any;
  constructor(
        private danhMucService: DanhmucService,
        public dialog: MatDialog,
        private confirmDialogService: ConfirmDialogService
  ) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  hasChild = (_: number, node: FoodNode) => {
    return !!node.children && node.children.length > 0;
  };
  ngOnInit(): void {
      this.loadData();   
      this.danhMucService.getAll();   
       
   // this.onExpand();
  }
  getDanhMuc(id: number) {
    let sp = null;
    this.danhmucs.forEach(e => {
        if (e.id === id) {
            sp = e;
            return false;
        }
    });
    return sp;
}
loadData() {
    this.subscriptions.push(
        this.danhMucService.itemsObs.subscribe(
            data => {
                this.danhmucs = data;
                this.dataSource = new MatTableDataSource<DanhMuc>(
                    this.danhmucs
                );
                this.transferTree(); 
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.isLoading = false;
            },
            () => {}
        ),
        this.danhMucService.isLoadingObs.subscribe(data => {
            this.isLoading = data;
        })
    );
}

ngOnDestroy() {
    if (this.subscriptions) {
        this.subscriptions.forEach(e => e.unsubscribe());
    }
}
onDelete(danhmuc: DanhMuc) {
    this.confirmDialogService.openDialog().then(result => {
        if (result) {
            this.danhMucService.delete(danhmuc);       
        }
    });
    
    

}
applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
}
dequy(idparent) {
    const children: FoodNode[] = [];
    this.danhmucs.forEach(element => {
         if (element.danhMuccha == idparent) {
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
findChildDeQuy(id: number, array: number[]) {
    array.push(id);
    this.danhmucs.forEach(element => {
        if (element.id === id) {
            array.push(element.id);
            this.findChildDeQuy(element.id, array);
        }
    });
}
danhMucFilter(node: FoodNode) {
    const array = [];
    this.findChildDeQuy(node.id, array);
    this.dataSource.filterPredicate = (data: DanhMuc, filter: number[]) => {
        return filter.indexOf(data.id) !== -1;
    };
    this.dataSource.filter = array;
}
onExpand() {
    this.expand = !this.expand;
    this.columnsToDisplay = this.expand
        ? [
              'id',
              'ten',
              'parent',
              'hinh',
              // 'created_at',
              // 'updated_at',
              'action'
          ]
        : ['id', 'ten', 'parent', 'hinh', 'action'];
}
onExpandDanhMuc() {
    this.expandDanhMuc = !this.expandDanhMuc;
}
onAdd() {
    this.dialog.open(DanhmucAddComponent, {
        width: '400px'
    });
}
onEdit(item) {
    this.dialog.open(DanhmucEditComponent, {
        width: '400px',
        data: item
    });
}
trackByFn(index, item) {
    return index;
}

}
