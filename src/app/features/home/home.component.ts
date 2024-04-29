import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { MCardComponent } from '../../m-framework/m-card/m-card.component';
import { MAnalogOutputComponent } from '../../m-framework/m-analog-output/m-analog-output.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MContainerComponent,MCardComponent,MAnalogOutputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  level:string;
  constructor()
  {
   this.level = "0"; 
   setInterval(()=> {this.level = (+this.level + 1) % 100+""; console.log(this.level)},100);
  }
 }
 