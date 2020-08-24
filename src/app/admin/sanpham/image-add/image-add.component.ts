import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { environment } from 'src/app/environments/environment.prod';
import { Sanpham } from 'src/app/models/sanpham';
import { DanhMucHinh } from 'src/app/models/danhmuchinh';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SanphamComponent } from '../sanpham.component';
import { DanhmuchinhService } from '../../service/danhmuchinh.service';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.sass']
})
export class ImageAddComponent implements OnInit ,OnDestroy {

  api_url = environment.api_img;
  sanpham: Sanpham;
  danhmuchinhs: DanhMucHinh[] = [];
  hinhsp: DanhMucHinh[] = [];
  subcriptions: Subscription[] = [];
  is_loading = false;  
  constructor(
      private dialogRef: MatDialogRef<SanphamComponent>,
      private danhmuchinhService: DanhmuchinhService,
      @Inject(MAT_DIALOG_DATA) public dataDialog: any
  ) {}
  ngOnInit() {
    this.sanpham = this.dataDialog.sanpham;
    this.danhmuchinhService.getAll();  
    this.loadData();
   
  }
  loadData() {
      this.subcriptions.push(
          this.danhmuchinhService.itemsObs.subscribe(
              data => {                
                  this.danhmuchinhs=data; 
                   this.hinhsp=[]; 
                  for (let index = 0; index < this.danhmuchinhs.length; index++) {
                    const element = this.danhmuchinhs[index];     
                    if(element.idSanPham == this.sanpham.id){                           
                        const peopleArraya =this.danhmuchinhs[index];
                                               
                        this.hinhsp.push(peopleArraya); 
                        // console.log(
                        //   this.hinhsp
                        // );
                      }  
                  }   
                  // this.danhmuchinhs=data;
              },   
              
          )  
                          
      );  
      
              
  }
  onAddImage(e) {
      //this.is_loading = true;
      const formData = new FormData();
      formData.append('idSanPham', this.sanpham.id.toString());
      formData.append('hinhAnh', e.target.files[0]);
      this.danhmuchinhService.createNew(formData);    
      
  }
  onDelele_hinh(item) {
      //this.is_loading = true;
      this.danhmuchinhService.delete(item);
  }
  onFileChange(e) {
      if (e.target.value.length > 0) {
         // this.is_loading = true;
          let file: File;
          if (e.target.files.length > 0) {
              file = e.target.files[0];
          }
          const formData = new FormData();
          formData.append('idSanPham', this.sanpham.id.toString());
          formData.append('hinhAnh', file);
          this.danhmuchinhService.createNew(formData);          
      }
  }
  ngOnDestroy(): void {
      this.subcriptions.forEach(e => {
          e.unsubscribe();
      });
  }

}
