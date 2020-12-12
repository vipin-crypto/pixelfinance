import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @Input() deliveryAddress: any;
  @Input() deliveryAddress1: any;

   serialNumber: number = 0;

  constructor(private api:ApiService) { }

  ngOnInit() {
     
  }
  
   
  


}
