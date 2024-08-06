import { Component, OnInit } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { MCardComponent } from '../../m-framework/m-card/m-card.component';
import { MAnalogOutputComponent } from '../../m-framework/m-analog-output/m-analog-output.component';
import { MMeterComponent } from '../../m-framework/m-meter/m-meter.component';
import { FirebaseService } from '../../services/firebase.service';
import { onValue, ref } from '@firebase/database';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MContainerComponent,
    MCardComponent,
    MAnalogOutputComponent,
    MMeterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  level: string;
  DClevel: number;
  LedStatus: number;
  buttonStatus: number;
  servoLevel: number;

  constructor(private firebase: FirebaseService) {
    this.DClevel = 0;
    this.LedStatus = 0;
    this.firebase.setupFirebase();
    this.level = '0';
    this.buttonStatus = 0;
    this.servoLevel = 0;


    onValue(ref(this.firebase.getFirebaseDatabase(),
    'Button/Value'),(data)=>{
      console.log(data.val());
      this.buttonStatus = data.val();
    })

    onValue(ref(this.firebase.getFirebaseDatabase(),
    'Distance/Value'),(data)=>{
      this.level = data.val();
    })
  }
  levelup() {
    this.DClevel = ((this.DClevel + 10) % 110);
    this.firebase.updateFirebase({ Motor: this.DClevel });
  }
  leveldown() {
    this.DClevel = ((this.DClevel - 10) % 110);
    this.firebase.updateFirebase({ Motor: this.DClevel });
  }
  turnOnLED() {
    this.firebase.updateFirebase({ LED: 1 });
    this.LedStatus = 100;
  }
  turnOffLED() {
    this.firebase.updateFirebase({ LED: 0 });
    this.LedStatus = 0;
  }
  incrementAngle(){
    this.servoLevel = ((this.servoLevel+10) %110);
    this.firebase.updateFirebase({Servo: this.servoLevel});
  }
  decrementAngle(){
    this.servoLevel = ((this.servoLevel - 10)%110);
    this.firebase.updateFirebase({Servo: this.servoLevel});
  }
}
