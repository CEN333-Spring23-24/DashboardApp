import { Injectable } from '@angular/core';
import { getDatabase, ref, update, child, onValue, get, remove} from "firebase/database";
import { initializeApp } from "firebase/app";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService { 
 db: any;

    constructor() {
      this.setupFirebase();  
      this.db = getDatabase();    
      }
      setupFirebase(){
        const firebaseConfig = {
          apiKey: "AIzaSyBYW3bBbSn4uzFb9wroPf01yzK_4Bdd-AU",
          authDomain: "controlandmonitoring-eb905.firebaseapp.com",
          databaseURL: "https://controlandmonitoring-eb905-default-rtdb.firebaseio.com",
          projectId: "controlandmonitoring-eb905",
          storageBucket: "controlandmonitoring-eb905.appspot.com",
          messagingSenderId: "977115271339",
          appId: "1:977115271339:web:a4cc4f7517e0546125e7ee",
          measurementId: "G-WMFB0D1SXX"
        };
        
        initializeApp(firebaseConfig);
      }
    updateFirebase(object: any) {
      update(ref(this.db, '/'), object);
      }
     getDataContinuosly(field: string): Observable<string>{
      return new Observable((observer) => {
        onValue(ref(this.db, field), (data) => {
          if(data.valueOf()!= null)
            observer.next(data.val());
        });
      });
     }
     getDataOnce(field: string): Promise<string>{
      return get(child(ref(this.db), field)).then((snapshot) => {
        if (snapshot.exists()) return snapshot.val();
        else return "";
      })      
     }
     getFirebaseDatabase(){
      return this.db;
    }
     reset(){
        remove(ref(this.db, '/'));
     }

}
