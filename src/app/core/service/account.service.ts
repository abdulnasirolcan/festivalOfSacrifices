import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Account } from '../model/account.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private dbPath = 'demo/';
  accountList: AngularFireList<Account[]>;

  constructor(private firebase: AngularFireDatabase, private af: AngularFirestore) {
    this.getAccounts();
  }

  getAccounts() {
    this.accountList = this.firebase.list(this.dbPath);
    return this.accountList.snapshotChanges();
  }

  getAddedProducts(): Observable<Account[]> {
    return this.af
      .collection<Account>('demo')
      .stateChanges(['added'])
      .pipe(
        map(actions =>
          actions.map(a => {
            const account = a.payload.doc.data() as Account;
            account.id = a.payload.doc.id;
            return account;
          }),
        ),
      );
  }

  addProduct(id?: string, paymentReceived?: Date | string): Promise<any> {
    const productCollection = this.af.doc<Account>(this.dbPath + id);
    return productCollection.update({
      paymentReceived,
    });
  }

  addProductTotal(id?: string, paymentReceivedTotal?: Date | string): Promise<any> {
    const productCollection = this.af.doc<Account>(this.dbPath + id);
    return productCollection.update({
      paymentReceivedTotal,
    });
  }
}
