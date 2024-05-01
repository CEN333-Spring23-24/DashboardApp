import { Component, OnInit } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { MCardComponent } from '../../m-framework/m-card/m-card.component';
import { MAnalogOutputComponent } from '../../m-framework/m-analog-output/m-analog-output.component';
import { MMeterComponent } from '../../m-framework/m-meter/m-meter.component';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MContainerComponent,MCardComponent,MAnalogOutputComponent, MMeterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  level:string;
  constructor(private firebase: FirebaseService)
  {
   this.firebase.setupFirebase();
   this.level = "0"; 
   //setInterval(()=> {this.level = (+this.level + 1) % 100+""; console.log(this.level)},100);
    this.firebase.getDataContinuosly('level').subscribe(data => {
      this.level = data;
    })
  }
  levelup(){
    let level = ""+(+this.level+10)%110;
    this.firebase.updateFirebase({'level':level})
  }
 
 
 }
 