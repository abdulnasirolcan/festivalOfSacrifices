import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { FestivalOfSacrificesState } from '../../../core/state';
import { FestivalOfSacrifices } from '../../../core/model';
import { CreateFestivalOfSacrifices } from 'src/app/core/action';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-festival-of-sacrifices',
  templateUrl: './festival-of-sacrifices.component.html',
  styleUrls: ['./festival-of-sacrifices.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalOfSacrificesComponent implements OnInit {
  @Select(FestivalOfSacrificesState.getFestivalOfSacrifice) accounts$: Observable<FestivalOfSacrifices[]>;

  @Input() page = 1;

  @Input() pageSize = 12;

  currentDate: string;

  payName: string;

  idName: string;

  public trackByFn(index, account) {
    if (!account) {
      return null;
    }
    return account.id;
  }

  get account$(): Observable<any> {
    return this.accounts$.pipe(
      filter(account => !!account.length),
      take(1),
      map(accounts =>
        accounts
          .map((account, i) => ({ id: i + 1, ...account }))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize),
      ),
    );
  }

  constructor(private store: Store, private modalService: NgbModal, private db: AngularFireDatabase) {}

  ngOnInit() {}

  openModalTime(content?: string, id?: string, relatedPerson?: string) {
    if (this.modalService.open(content)) {
      this.currentDate = new Date().toTimeString().substring(0, 5);
      this.payName = relatedPerson;
      this.idName = id;
    }
  }

  currentTime(currentTime, idTime) {
    return this.store.dispatch(
      new CreateFestivalOfSacrifices({
        id: idTime,
        cutReceived: currentTime,
      }),
    );
  }
}
