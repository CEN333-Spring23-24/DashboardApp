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
          apiKey: "AIzaSyDlJibPFNnChGTttlHbokMU5cONbEyuOKs",
          authDomain: "test-b2585.firebaseapp.com",
          databaseURL: "https://test-b2585-default-rtdb.firebaseio.com",
          projectId: "test-b2585",
          storageBucket: "test-b2585.appspot.com",
          messagingSenderId: "481311246512",
          appId: "1:481311246512:web:4764b07947246274395375"
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
    
     reset(){
        remove(ref(this.db, '/'));
     }

}
