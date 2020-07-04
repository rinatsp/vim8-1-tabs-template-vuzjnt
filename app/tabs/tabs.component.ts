import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  ContentChildren,
  OnDestroy,
  QueryList,
} from "@angular/core";
import { TabComponent } from "./tab/tab.component";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "tabs",
  template: ` <div class="tabs__titles"><ng-content></ng-content></div> `,
})
export class TabsComponent
  implements AfterContentChecked, AfterContentInit, OnDestroy {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  ngUnsubscribe = new Subject<void>();

  ngAfterContentInit(): void {
    this.subscribeTabSelectedEvent();
    this.tabs.changes.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.subscribeTabSelectedEvent();
    });
    this.selectFirstTab();
  }

  ngAfterContentChecked() {
    this.selectFirstTab();
  }


  selectFirstTab() {
    const activeTabs: any = this.tabs.toArray().filter((tab) => tab.active);
    if (!activeTabs.length && this.tabs.first) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().map((t) => (t.active = false));
    tab.active = true;
  }

  subscribeTabSelectedEvent() {
    this.tabs.forEach((tab) => {
      tab.selected.pipe(takeUntil(tab.ngUnsubscribe)).subscribe((tab) => {
        this.selectTab(tab);
      });
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
