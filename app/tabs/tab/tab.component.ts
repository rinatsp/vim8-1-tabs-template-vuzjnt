import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from "@angular/core";
import { TabTitleComponent } from "./tab-title/tab-title.component";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { TabContentComponent } from "./tab-content/tab-content.component";

@Component({
  selector: "tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.css"],
})
export class TabComponent
  implements AfterContentInit, AfterContentChecked, OnDestroy {
  @ContentChild(TabTitleComponent, { static: false })
  tabTitle: TabTitleComponent;
  @ContentChild(TabContentComponent, { static: false })
  tabContent: TabContentComponent;
  @Input() active = false;
  @Input() dataContext;
  @Output() selected = new EventEmitter<TabComponent>();

  ngUnsubscribe = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.tabTitle.selected.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      if (!this.tabTitle.active) {
        this.selected.emit(this);
      }
    });
  }

  ngAfterContentChecked(): void {
    if (this.active) {
      this.tabContent.active = true;
      this.tabTitle.active = true;
    } else {
      this.tabContent.active = false;
      this.tabTitle.active = false;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
