import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { FlexLayoutModule }    from '@angular/flex-layout';
import { MomentModule }        from 'angular2-moment';

import { SafeHtmlPipe }         from './pipes/safe-html/safe-html.pipe';
import { ViewResizeDirective }  from './directives/view-resize/view-resize.directive';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ SafeHtmlPipe, ViewResizeDirective ],
  exports:      [ SafeHtmlPipe, ViewResizeDirective,
    CommonModule, FormsModule, FlexLayoutModule, MomentModule]
})
export class SharedModule { }
