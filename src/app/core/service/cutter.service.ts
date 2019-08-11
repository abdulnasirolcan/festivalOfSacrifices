import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Account } from '../model/account.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CutterService {
  private dbPath = 'festivalOfSacrifices/';
  cutterList: AngularFireList<Account[]>;

  constructor(private firebase: AngularFireDatabase, private af: AngularFirestore) {
    this.getCutters();
  }

  getCutters() {
    this.cutterList = this.firebase.list(this.dbPath);
    return this.cutterList.snapshotChanges();
  }

  getAddedCutter(): Observable<Account[]> {
    return this.af
      .collection<Account>('festivalOfSacrifices')
      .stateChanges(['added'])
      .pipe(
        map(actions =>
          actions.map(a => {
            const cutter = a.payload.doc.data() as Account;
            cutter.id = a.payload.doc.id;
            return cutter;
          }),
        ),
      );
  }

  addCutter(id?: string, cutReceived?: Date | string): Promise<any> {
    const cutterCollection = this.af.doc<Account>(this.dbPath + id);
    return cutterCollection.update({
      cutReceived,
    });
  }

  addCutterTotal(id?: string, cutReceivedTotal?: Date | string): Promise<any> {
    const productCollection = this.af.doc<Account>(this.dbPath + id);
    return productCollection.update({
      cutReceivedTotal,
    });
  }
}
