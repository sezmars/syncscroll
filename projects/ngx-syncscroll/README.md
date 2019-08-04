# ngx-syncscroll

[![NPM](https://nodei.co/npm/ngx-syncscroll.png?compact=true)](https://nodei.co/npm/ngx-barcodeput/)

**[Demo](https://sezmars.github.io/syncscroll/)**

ngx-syncscroll is a micro library rewritten in Angular, which allows to scroll two or more scrollable areas simultaneously.

Based on https://github.com/asvd/syncscroll.

```HTML
<ngx-syncscroll [classSyncScroll]="'drag-timeline'" [dragState]="true" [attributeName]="'drag-scroll-timeline'">
       <div class="container syncscroll dragscroll frame time romanian" [ngClass]="'drag-timeline'"
            [attr.drag-scroll-timeline]="true">
         <img src="../assets/romanian_timeline.png">
       </div>
   
       <div class="container syncscroll dragscroll frame time floss" [ngClass]="'drag-timeline'"
            [attr.drag-scroll-timeline]="true">
         <img src="../assets/floss_timeline.png">
       </div>
</ngx-syncscroll>
```

## Installation

```shell
npm install --save ngx-syncscroll
```

## Usage

Add `NgxSyncScrollModule` to your list of module imports:

```typescript
import { NgxSyncScrollModule } from 'ngx-syncscroll';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxSyncScrollModule],
  bootstrap: [AppComponent]
})
class AppModule {}
```

You can then use the component in your templates:

```typescript
@Component({
  selector: 'app',
  template: `
    <ngx-syncscroll [classSyncScroll]="'drag-timeline'" [dragState]="true" [attributeName]="'drag-scroll-timeline'">
       <div class="container syncscroll dragscroll frame time romanian" [ngClass]="'drag-timeline'"
            [attr.drag-scroll-timeline]="true">
         <img src="../assets/romanian_timeline.png">
       </div>
   
       <div class="container syncscroll dragscroll frame time floss" [ngClass]="'drag-timeline'"
            [attr.drag-scroll-timeline]="true">
         <img src="../assets/floss_timeline.png">
       </div>
     </ngx-syncscroll>
       `
})
```

### Options

| Property name | Type | Default | Description |
| ------------- | ---- | ------- | ----------- |
| `dragState` | boolean | `false` | Drag mode for images. |
| `attributeName` | string | `null` | Unique attribute name for a block with scrolling. Need to be used with [attr] property for child. |
| `classSyncScroll` | string | `null` | Unique class name for a block with scrolling. Need to be used with [ngClass] or html class for child. |
