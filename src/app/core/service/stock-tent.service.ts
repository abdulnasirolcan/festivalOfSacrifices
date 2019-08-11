import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Account } from '../model/account.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StockTentService {
  private dbPath = 'festivalOfSacrifices/';
  stockTentList: AngularFireList<Account[]>;

  constructor(private firebase: AngularFireDatabase, private af: AngularFirestore) {
    this.getStockTents();
  }

  getStockTents() {
    this.stockTentList = this.firebase.list(this.dbPath);
    return this.stockTentList.snapshotChanges();
  }

  getAddedStockTent(): Observable<Account[]> {
    return this.af
      .collection<Account>('festivalOfSacrifices')
      .stateChanges(['added'])
      .pipe(
        map(actions =>
          actions.map(a => {
            const stockTent = a.payload.doc.data() as Account;
            stockTent.id = a.payload.doc.id;
            return stockTent;
          }),
        ),
      );
  }

  addStockTent(id?: string, shareTentEntry?: Date | string): Promise<any> {
    const stockTentCollection = this.af.doc<Account>(this.dbPath + id);
    return stockTentCollection.update({
      shareTentEntry,
    });
  }

  addStockTentTotal(id?: string, shareTentEntryTotal?: Date | string): Promise<any> {
    const stockTentCollection = this.af.doc<Account>(this.dbPath + id);
    return stockTentCollection.update({
      shareTentEntryTotal,
    });
  }
}
