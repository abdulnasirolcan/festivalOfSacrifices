import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { StockTentState } from '../../../core/state';
import { Account } from '../../../core/model';
import { CreateStockTent, CreateStockTentTotal } from '../../../core/action';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stock-tent',
  templateUrl: './stock-tent.component.html',
  styleUrls: ['./stock-tent.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockTentComponent implements OnInit {
  @Select(StockTentState.getStockTent) accounts$: Observable<Account[]>;
  currentDate: string;
  payName: string;
  idName: string;
  selectedSortOrder: string = 'Küpe No Seçiniz';
  ProductDetails: object = [];
  totalPaymentId: string[];
  isDisabled: boolean;
  isDisabledTotal: boolean;

  public trackByFn(index, account) {
    if (!account) {
      return null;
    }
    return account.id;
  }

  public trackElement(index: number, account: any) {
    return account ? !!account.earringsNumber : null;
  }

  get accountRowNumber$(): Observable<any> {
    return this.accounts$.pipe(
      take(1),
      map(accounts => accounts.filter(x => x.earringsNumber !== null)),
    );
  }

  constructor(private store: Store, private modalService: NgbModal, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {}

  SearchProduct(id: number, rowNumber: number, earringsNumber: number) {
    this.accounts$
      .pipe(
        filter(account => !!account.length),
        take(1),
      )
      .subscribe(accounts => {
        this.ProductDetails = accounts.filter(x => x.rowNumber === rowNumber);
        this.totalPaymentId = accounts
          .filter(x => x.rowNumber === rowNumber && x.earringsNumber === earringsNumber)
          .map(y => y.id);
        this.isDisabled = accounts.filter(x => x.rowNumber === rowNumber && x.shareTentEntry !== null) ? false : true;
        this.isDisabledTotal = accounts.filter(x => x.id === this.totalPaymentId[0] && x.shareTentEntryTotal !== null)
          ? true
          : false;
      });
  }

  openModalTime(content?: string, id?: string, relatedPerson?: string) {
    const timeAll = new Date().toTimeString().substring(0, 5);
    if (this.modalService.open(content)) {
      this.currentDate = timeAll;
      this.payName = relatedPerson;
      this.idName = id;
    }
  }

  currentTime(currentTime, idTime) {
    this.store.dispatch(
      new CreateStockTent({
        id: idTime,
        shareTentEntry: currentTime,
      }),
    );
    setTimeout(() => {
      this.cdRef.detectChanges();
    }, 1000);
  }

  currentTimeTotal(currentTimeTotal, idTime) {
    this.store.dispatch(
      new CreateStockTentTotal({
        id: idTime,
        shareTentEntryTotal: currentTimeTotal,
      }),
    );
    setTimeout(() => {
      this.cdRef.detectChanges();
    }, 1000);
  }
}
