import {NgModule} from '@angular/core';
import {NgxSyncScrollDirective} from './directive/syncscroll.directive';

@NgModule({
  declarations: [NgxSyncScrollDirective],
  exports: [NgxSyncScrollDirective]
})
export class NgxSyncScrollModule {
}
