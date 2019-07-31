import {AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2} from '@angular/core';

@Directive({
  selector: '[ngxSyncScroll]'
})
export class NgxSyncScrollDirective implements AfterViewInit, OnDestroy {
  @Input() nameSyncScroll: string = null;
  public names: any = {};

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef) {
  }

  public ngAfterViewInit(): void {
    if (this.nameSyncScroll) {
      this.renderer.addClass(this.elementRef.nativeElement, this.nameSyncScroll);
      this.renderer.setAttribute(this.elementRef.nativeElement, 'name', this.nameSyncScroll);
      this.reset();
    }
  }

  public ngOnDestroy(): void {
    window.removeEventListener('scroll', this.reset);
    document.removeEventListener('scroll', this.reset);
  }

  public reset() {
    const blocks = document.getElementsByClassName(this.nameSyncScroll);
    let j;
    let el;
    let name;
    let found;
    /**
     * Setting-up the new listeners
     */
    for (let i = 0; i < blocks['length'];) {
      found = j = 0;
      el = blocks[i++];
      const check = (name = el.getAttribute('name'));
      if (!check) {
        /**
         * Name attribute is not set
         */
        continue;
      }

      /**
       * Needed for intence
       */
      el = el['scroller'] || el;
      /**
       * Searching for existing entry in array of names;
       * Searching for the element in that entry
       */
      for (; j < (this.names[name] = this.names[name] || [])['length'];) {
        // @ts-ignore
        found |= this.names[name][j++] === el;
      }

      if (!found) {
        this.names[name].push(el);
      }

      el.eX = el.eY = 0;
      this.renderer.listen(el, 'scroll', this.eventListenerScroll.bind(this));
    }
  }

  private eventListenerScroll(this) {
    const element = this.elementRef.nativeElement;
    element.syn = (() => {
      const elements = this.names[this.nameSyncScroll];
      let scrollX = element['scrollLeft'];
      const xRate =
        scrollX /
        (element['scrollWidth'] - element['clientWidth']);
      const updateX = scrollX !== element.eX;
      let otherElement;
      let i = 0;

      element.eX = scrollX;
      element.eY = scrollY;
      for (; i < elements['length'];) {
        otherElement = elements[i++];
        if (otherElement !== element) {
          if (updateX &&
            Math.round(
              otherElement['scrollLeft'] -
              (scrollX = otherElement.eX =
                  Math.round(xRate *
                    (otherElement['scrollWidth'] -
                      otherElement['clientWidth']))
              )
            )
          ) {
            otherElement['scrollLeft'] = scrollX;
          }
        }
      }
    })();
  }
}
