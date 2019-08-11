import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FestivalOfSacrifices } from '../model/festival-of-sacrifies.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FestivalOfSacrificesService {
  private dbPath = 'festivalOfSacrifices/';
  festivalOfSacrificesList: AngularFireList<FestivalOfSacrifices[]>;

  constructor(private firebase: AngularFireDatabase, private af: AngularFirestore) {
    this.getFestivalOfSacrifices();
  }

  getFestivalOfSacrifices() {
    this.festivalOfSacrificesList = this.firebase.list(this.dbPath);
    return this.festivalOfSacrificesList.snapshotChanges();
  }

  getAddedFestivalOfSacrifices(): Observable<FestivalOfSacrifices[]> {
    return this.af
      .collection<FestivalOfSacrifices>('festivalOfSacrifices')
      .stateChanges(['added'])
      .pipe(
        map(actions =>
          actions.map(a => {
            const festivalOfSacrifices = a.payload.doc.data() as FestivalOfSacrifices;
            festivalOfSacrifices.id = a.payload.doc.id;
            return festivalOfSacrifices;
          }),
        ),
      );
  }

  addFestivalOfSacrifices(id?: string, cutReceived?: Date | string): Promise<any> {
    const festivalOfSacrificesCollection = this.af.doc<FestivalOfSacrifices>(this.dbPath + id);
    return festivalOfSacrificesCollection.update({
      cutReceived,
    });
  }
}
