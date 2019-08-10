import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, OperatorFunction } from 'rxjs';
import { map, filter, take, retry } from 'rxjs/operators';
import { AccountState } from '../../../core/state';
import { Account } from '../../../core/model';
import { CreateAccount, CreateAccountTotal } from 'src/app/core/action';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountComponent implements OnInit {
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
  isValidForm: boolean = false;

  // ChangeSortOrder(newSortOrder: number, rowName: string) {
  //   //this.selectedSortOrder = newSortOrder + ' - ' + rowName;
  //   return this.accounts$.pipe(
  //     take(1),
  //     map(accounts => {
  //       return (this.ProductDetails = accounts.filter(
  //         x => x.earringsNumber !== null && x.earringsNumber === newSortOrder,
  //       ));
  //     }),
  //   );
  // }

  SearchProduct(id: number, rowNumber: number, earringsNumber: number, relatedPerson: number) {
    this.selectedSortOrder = earringsNumber + ' - ' + relatedPerson;
    this.accounts$
      .pipe(
        filter(account => !!account.length),
        take(1),
      )
      .subscribe(accounts => {
        const accountsRowNumber = accounts.filter(x => x.rowNumber === rowNumber);
        this.ProductDetails = accountsRowNumber;
        this.totalPaymentId = accounts
          .filter(x => x.rowNumber === rowNumber && x.earringsNumber === earringsNumber)
          .map(y => y.id);
        this.isValidForm = !!accountsRowNumber;
        this.isDisabled = accounts.filter(x => x.rowNumber === rowNumber && x.paymentReceived !== null) ? false : true;
        this.isDisabledTotal = accounts.filter(
          x => x.id === String(this.totalPaymentId) && x.paymentReceivedTotal !== null,
        )
          ? false
          : true;
        console.warn(this.totalPaymentId);
      });
  }
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
      new CreateAccount({
        id: idTime,
        paymentReceived: currentTime,
      }),
    );
    setTimeout(() => {
      this.cdRef.detectChanges();
    }, 1000);
  }

  currentTimeTotal(currentTimeTotal, idTime) {
    this.store.dispatch(
      new CreateAccountTotal({
        id: idTime,
        paymentReceivedTotal: currentTimeTotal,
      }),
    );
    setTimeout(() => {
      this.cdRef.detectChanges();
    }, 1000);
  }
}
