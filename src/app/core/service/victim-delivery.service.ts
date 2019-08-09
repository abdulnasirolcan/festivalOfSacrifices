import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Account } from '../model/account.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VictimDeliveryService {
  private dbPath = 'demo/';
  victimDeliveryList: AngularFireList<Account[]>;

  constructor(private firebase: AngularFireDatabase, private af: AngularFirestore) {
    this.getVictimDeliverys();
  }

  getVictimDeliverys() {
    this.victimDeliveryList = this.firebase.list(this.dbPath);
    return this.victimDeliveryList.snapshotChanges();
  }

  getAddedVictimDelivery(): Observable<Account[]> {
    return this.af
      .collection<Account>('demo')
      .stateChanges(['added'])
      .pipe(
        map(actions =>
          actions.map(a => {
            const victimDelivery = a.payload.doc.data() as Account;
            victimDelivery.id = a.payload.doc.id;
            return victimDelivery;
          }),
        ),
      );
  }

  addVictimDelivery(id?: string, victimDelivery?: Date | string): Promise<any> {
    const victimDeliveryCollection = this.af.doc<Account>(this.dbPath + id);
    return victimDeliveryCollection.update({
      victimDelivery,
    });
  }

  addVictimDeliveryTotal(id?: string, victimDeliveryTotal?: Date | string): Promise<any> {
    const victimDeliveryCollection = this.af.doc<Account>(this.dbPath + id);
    return victimDeliveryCollection.update({
      victimDeliveryTotal,
    });
  }
}
