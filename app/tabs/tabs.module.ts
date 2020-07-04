import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TabsComponent } from "./tabs.component";
import { TabComponent } from './tab/tab.component';
import { TabContentComponent } from './tab/tab-content/tab-content.component';
import { TabTitleComponent } from './tab/tab-title/tab-title.component';



@NgModule({
  imports: [CommonModule],
  declarations: [TabsComponent, TabComponent, TabContentComponent, TabTitleComponent],
  exports: [TabsComponent, TabComponent, TabTitleComponent, TabContentComponent]
})
export class TabsModule {}