import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Account } from '../model/account.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContourOutputService {
  private dbPath = 'demo/';
  contourOutputList: AngularFireList<Account[]>;

  constructor(private firebase: AngularFireDatabase, private af: AngularFirestore) {
    this.getContourOutputs();
  }

  getContourOutputs() {
    this.contourOutputList = this.firebase.list(this.dbPath);
    return this.contourOutputList.snapshotChanges();
  }

  getAddedContourOutput(): Observable<Account[]> {
    return this.af
      .collection<Account>('demo')
      .stateChanges(['added'])
      .pipe(
        map(actions =>
          actions.map(a => {
            const contourOutput = a.payload.doc.data() as Account;
            contourOutput.id = a.payload.doc.id;
            return contourOutput;
          }),
        ),
      );
  }

  addContourOutput(id?: string, containerDelivered?: Date | string): Promise<any> {
    const contourOutputCollection = this.af.doc<Account>(this.dbPath + id);
    return contourOutputCollection.update({
      containerDelivered,
    });
  }

  addContourOutputTotal(id?: string, containerDeliveredTotal?: Date | string): Promise<any> {
    const contourOutputCollection = this.af.doc<Account>(this.dbPath + id);
    return contourOutputCollection.update({
      containerDeliveredTotal,
    });
  }
}
