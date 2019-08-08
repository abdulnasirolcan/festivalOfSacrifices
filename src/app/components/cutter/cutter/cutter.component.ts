import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { CutterState, AccountState } from '../../../core/state';
import { Cutter, Account } from '../../../core/model';
import { CreateCutter, CreateCutterTotal } from 'src/app/core/action';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cutter',
  templateUrl: './cutter.component.html',
  styleUrls: ['./cutter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CutterComponent implements OnInit {
  @Select(AccountState.getAccount) accounts$: Observable<Account[]>;

  @Input() page = 1;

  @Input() pageSize = 6;

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
        this.isDisabled = accounts.filter(x => x.rowNumber === rowNumber && x.cutReceived !== null) ? false : true;
        this.isDisabledTotal = accounts.filter(x => x.id === this.totalPaymentId[0] && x.cutReceivedTotal !== null)
          ? true
          : false;
        this.cdRef.detectChanges();
      });
  }

  openModalTime(content?: string, id?: string, relatedPerson?: string) {
    const timeAll = new Date().toTimeString().substring(0, 5);
    if (this.modalService.open(content)) {
      this.currentDate = timeAll;
      this.payName = relatedPerson;
      this.idName = id;
    }
    this.cdRef.detectChanges();
  }

  currentTime(currentTime, idTime) {
    setTimeout(
      () =>
        this.store.dispatch(
          new CreateCutter({
            id: idTime,
            cutReceived: currentTime,
          }),
        ),
      0,
    );
    this.cdRef.detectChanges();
  }

  currentTimeTotal(currentTimeTotal, idTime) {
    setTimeout(
      () =>
        this.store.dispatch(
          new CreateCutterTotal({
            id: idTime,
            cutReceivedTotal: currentTimeTotal,
          }),
        ),
      0,
    );
    this.cdRef.detectChanges();
  }
}
