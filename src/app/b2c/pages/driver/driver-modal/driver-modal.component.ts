import { Component, OnInit, Input } from '@angular/core';
import base from '../../../services/api.service'

@Component({
  selector: 'app-driver-modal',
  templateUrl: './driver-modal.component.html',
  styleUrls: ['./driver-modal.component.scss']
})
export class DriverModalComponent implements OnInit {
  @Input() deliveryAddress: any;
  @Input() documents: any;

  imageUrl=base;

  constructor() { }

  ngOnInit() {
  
  }

}
