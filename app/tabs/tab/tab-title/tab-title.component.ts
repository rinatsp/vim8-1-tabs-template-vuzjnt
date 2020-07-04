import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.css']
})
export class TabTitleComponent {
  @Input() active = false;
  @Input() dataContext;
  @Output() selected = new EventEmitter<void>();

  template: TemplateRef<any>;

  @HostListener('click')
  onTabClick() {
    this.selected.emit();
    event.stopPropagation();
  }

}
