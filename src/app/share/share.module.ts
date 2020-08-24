import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NoSanitizePipe } from '../pipe/no-sanitize.pipe';
import { TextTruncatePipe } from '../pipe/text-truncate.pipe';
import { DemoMaterialModule } from '../admin/material-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [TextTruncatePipe, NoSanitizePipe],
    imports: [
        CommonModule,
        DemoMaterialModule,
        ReactiveFormsModule,
        FormsModule,       
        RouterModule,
        NgbModule, 
    ],
    exports: [       
        DemoMaterialModule,
        ReactiveFormsModule,
        TextTruncatePipe,
        FormsModule,      
        NoSanitizePipe,
        RouterModule,
        CommonModule,
        NgbModule,        
        
    ]
})
export class ShareModule {}
