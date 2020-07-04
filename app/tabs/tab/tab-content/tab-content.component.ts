import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css']
})
export class TabContentComponent {
  @Input() active = false;
  @Input() dataContext;
  template: TemplateRef<any>;
}
