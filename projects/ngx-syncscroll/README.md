# ngx-syncscroll

[![NPM](https://nodei.co/npm/ngx-syncscroll.png?compact=true)](https://nodei.co/npm/ngx-barcodeput/)

**[Demo](https://sezmars.github.io/syncscroll/)**

Syncscroll is a micro library rewritten in Angular, which allows to scroll two or more scrollable areas simultaneously.

Based on https://github.com/asvd/syncscroll.

```HTML
<div class="scroller" ngxSyncScroll [nameSyncScroll]="'syncscroll'">...</div>
<div class="tracks" ngxSyncScroll [nameSyncScroll]="'syncscroll'">...</div>
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

You can then use the directive in your templates:

```typescript
@Component({
  selector: 'app',
  template: `
    <div class="scroller" ngxSyncScroll [nameSyncScroll]="'syncscroll'">...</div>
    <div class="tracks" ngxSyncScroll [nameSyncScroll]="'syncscroll'">...</div>
       `
})
```

### Options

| Property name | Type | Default | Description |
| ------------- | ---- | ------- | ----------- |
| `nameSyncScroll` | string | `null` | Unique name for a block with horizontal scrolling. |
