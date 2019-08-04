import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';

declare var window;
declare var document;

@Component({
  selector: 'ngx-syncscroll',
  templateUrl: './ngx-syncscroll.component.html',
  styleUrls: ['./ngx-syncscroll.component.css']
})
export class NgxSyncScrollComponent implements AfterViewInit, OnDestroy {
  private names = {};
  private dragged = [];
  private cloneWindow = window;
  private cloneDocument = document;
  @Input() public dragState: boolean = false;
  @Input() public attributeName: string = null;
  @Input() public classSyncScroll: string = null;

  private static clearScrollListeners(blocks) {
    /**
     * Clearing existing listeners
     */
    for (const name in blocks) {
      if (blocks.hasOwnProperty(name)) {
        for (let i = 0; i < blocks[name][length]; i++) {
          blocks[name][i].removeEventListener(
            scroll, blocks[name][i].syn, 0
          );
        }
      }
    }
  }

  public ngAfterViewInit(): void {
    if (this.classSyncScroll) {
      this.sync();
      if (this.dragState) {
        this.syncDrag();
      }
    }
  }


  public ngOnDestroy(): void {
    window.removeEventListener('scroll', this.sync);
    document.removeEventListener('scroll', this.sync);
  }

  private sync() {
    let j;
    let name;
    const blocks = document.getElementsByClassName(this.classSyncScroll);

    NgxSyncScrollComponent.clearScrollListeners(blocks);
    /**
     * Setting-up the new listeners
     */
    for (let i = 0; i < blocks.length;) {
      let found = j = 0;
      let element = blocks[i++];
      const check = (name = element.getAttribute(this.attributeName));
      if (!check) {
        /**
         * Name attribute is not set
         */
        continue;
      }

      /**
       * Needed for intence
       */
      element = element['scroller'] || element;
      /**
       * Searching for existing entry in array of names;
       * Searching for the element in that entry
       */
      for (; j < (this.names[name] = this.names[name] || []).length;) {
        found |= (this.names[name][j++] === element) as any;
      }

      if (!found) {
        this.names[name].push(element);
      }

      element.eX = element.eY = 0;
      this.eventListenerScroll(element, name, this.names);

    }
  }

  private syncDrag() {
    this.clearDragListeners();
    this.eventListenerDragScroll(this.dragged);
  }

  private eventListenerScroll(element, name, names) {
    ((element, name) => {
      element.addEventListener(
        'scroll',
        element.syn = () => {
          const elements = names[name];
          let scrollY = element.scrollTop;
          let scrollX = element.scrollLeft;
          const xRate =
            scrollX /
            (element.scrollWidth - element.clientWidth);
          const yRate =
            scrollY /
            (element.scrollHeight - element.clientHeight);
          const updateX = scrollX !== element.eX;
          const updateY = scrollY !== element.eY;
          let otherElement;
          let index = 0;

          element.eX = scrollX;
          element.eY = scrollY;
          for (; index < elements.length;) {
            otherElement = elements[index++];
            if (otherElement !== element) {
              if (updateX &&
                Math.round(
                  otherElement.scrollLeft -
                  (scrollX = otherElement.eX =
                      Math.round(xRate *
                        (otherElement.scrollWidth -
                          otherElement.clientWidth))
                  )
                )
              ) {
                otherElement.scrollLeft = scrollX;
              }
              if (updateY &&
                Math.round(
                  otherElement.scrollTop -
                  (scrollY = otherElement.eY =
                      Math.round(yRate *
                        (otherElement.scrollHeight -
                          otherElement.clientHeight))
                  )
                )
              ) {
                otherElement.scrollTop = scrollY;
              }
            }
          }
        }, 0
      );
    })(element, name);
  }

  private eventListenerDragScroll(dragged) {
    /**
     * Cloning into array since HTMLCollection is updated dynamically
     */
    dragged = [].slice.call(this.cloneDocument.getElementsByClassName(this.classSyncScroll));
    for (let i = 0; i < dragged.length;) {
      ((element, lastClientX, lastClientY, pushed, scroller, cont, newScrollX, newScrollY) => {
        (cont = element.container || element).addEventListener(
          'mousedown',
          cont.md = (event) => {
            if (!element.hasAttribute('nochilddrag') ||
              this.cloneDocument.elementFromPoint(
                event.pageX, event.pageY
              ) === cont
            ) {
              pushed = 1;
              lastClientX = event.clientX;
              lastClientY = event.clientY;

              event.preventDefault();
            }
          }, 0
        );

        this.cloneWindow.addEventListener(
          'mouseup', cont.mu = () => {
            pushed = 0;
          }, 0
        );

        this.cloneWindow.addEventListener(
          'mousemove',
          cont.mm = (event) => {
            if (pushed) {
              (scroller = element.scroller || element).scrollLeft -=
                newScrollX = (-lastClientX + (lastClientX = event.clientX));
              scroller.scrollTop -=
                newScrollY = (-lastClientY + (lastClientY = event.clientY));
              if (element === this.cloneDocument.body) {
                (scroller = this.cloneDocument.documentElement).scrollLeft -= newScrollX;
                scroller.scrollTop -= newScrollY;
              }
            }
          }, 0
        );
      })(dragged[i++]);
    }
  }

  private clearDragListeners() {
    /**
     * Clearing existing listeners
     */
    for (let i = 0; i < this.dragged.length;) {
      let element = this.dragged[i++];
      element = element.container || element;
      element.removeEventListener('mousedown', element.md, 0);
      this.cloneWindow.removeEventListener('mouseup', element.mu, 0);
      this.cloneWindow.removeEventListener('mousemove', element.mm, 0);
    }
  }
}
