import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { ContourOutputState } from '../../../core/state';
import { Account } from '../../../core/model';
import { CreateContourOutput, CreateContourOutputTotal } from '../../../core/action';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contour-output',
  templateUrl: './contour-output.component.html',
  styleUrls: ['./contour-output.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContourOutputComponent implements OnInit {
  @Select(ContourOutputState.getContourOutput) accounts$: Observable<Account[]>;
  currentDate: string;
  payName: string;
  idName: string;
  selectedSortOrder: string = 'Küpe No Seçiniz';
  ProductDetails: object = [];
  totalPaymentId: string[];
  totalPaymentIdTotal: string[];
  isDisabled: boolean;
  isDisabledTotal: boolean;
  isValidForm: boolean = false;

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

  SearchProduct(id: number, rowNumber: number, earringsNumber: number, relatedPerson: number) {
    this.selectedSortOrder = 'Sıra No: ' + rowNumber + ' Küpe No: ' + earringsNumber + ' İlgili Kişi: ' + relatedPerson;
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
        this.totalPaymentIdTotal = accounts.filter(x => x.rowNumber === rowNumber).map(y => y.id);
        this.isValidForm = !!accountsRowNumber;
        this.isDisabled = accounts.filter(x => x.rowNumber === rowNumber && x.containerDelivered !== null)
          ? false
          : true;
        this.isDisabledTotal = accounts.filter(
          x => x.id === String(this.totalPaymentId) && x.containerDeliveredTotal !== null,
        )
          ? false
          : true;
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
    this.store.dispatch(
      new CreateContourOutput({
        id: idTime,
        containerDelivered: currentTime,
      }),
    );
    setTimeout(() => {
      this.cdRef.detectChanges();
    }, 1000);
  }

  currentTimeTotal(currentTimeTotal, idTime) {
    this.store.dispatch(
      new CreateContourOutputTotal({
        id: idTime,
        containerDeliveredTotal: currentTimeTotal,
      }),
    );
    this.totalPaymentIdTotal.map((account, i) => this.currentTime(currentTimeTotal, account));
    setTimeout(() => {
      this.cdRef.detectChanges();
    }, 1000);
  }
}
