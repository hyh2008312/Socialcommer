import { Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-catalog-time-select',
  templateUrl: './catalog-time-select.component.html',
  styleUrls: ['../shop.scss']
})

export class CatalogTimeSelectComponent implements OnInit {

  @Input() time : string;
  @Input() times : [Object];

  @Output() timeChange = new EventEmitter<string>();

  panel: boolean = false;

  constructor(

  ) { }

  ngOnInit(): void {

  }

  showPanel() {
    this.panel = !this.panel;
  }

  closePanel() {
    this.panel = false;
  }

  addTime(time: any) {
    this.time = time.value;

    this.timeChange.emit(this.time);
  }

}
