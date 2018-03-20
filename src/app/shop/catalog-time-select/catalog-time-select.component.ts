import { Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-catalog-time-select',
  templateUrl: './catalog-time-select.component.html',
  styleUrls: ['../listings/_shop.scss']
})

export class CatalogTimeSelectComponent implements OnInit {

  @Input() time : string;
  @Input() times : any[] = [];

  @Output() timeChange = new EventEmitter<any>();

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
    this.closePanel();
    this.timeChange.emit(time);
  }

}
