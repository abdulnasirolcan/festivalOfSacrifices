import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { Account } from '../../../core/model';
import { CreateVictimDelivery, CreateVictimDeliveryTotal, CreateFormVictimDelivery } from '../../../core/action';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VictimDeliveryState } from '../../../core/state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-victim-delivery',
  templateUrl: './victim-delivery.component.html',
  styleUrls: ['./victim-delivery.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VictimDeliveryComponent implements OnInit, AfterViewInit {
  @Select(VictimDeliveryState.getVictimDelivery) accounts$: Observable<Account[]>;
  currentDate: string;
  payName: string;
  idName: string;
  selectedSortOrder: string = 'Küpe No Seçiniz';
  ProductDetails: object = [];
  totalPaymentId: string[];
  animalTotal: number;
  animalTotalCount: number;
  isDisabled: boolean;
  isDisabledTotal: boolean;
  form: FormGroup;
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

  constructor(
    private store: Store,
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.createVictimDelivery();
  }

  createVictimDelivery = () => {
    this.form = this.fb.group({
      id: null,
      meat: ['', Validators.required],
      bone: ['', Validators.required],
    });
  };

  ngAfterViewInit(): void {}
  save = (meat, bone) => {
    if (this.form.valid) {
      this.store.dispatch(
        new CreateFormVictimDelivery({
          id: String(this.totalPaymentId),
          meat,
          bone,
        }),
      );
    }
    this.form.reset();
    setTimeout(() => {
      this.cdRef.detectChanges();
    }, 1000);
  };

  SearchProduct(
    id: number,
    rowNumber: number,
    earringsNumber: number,
    relatedPerson: number,
    meat: number,
    bone: number,
    animalWeight: number,
    victimDeliveryTotal: string,
  ) {
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
        this.isDisabled = accounts.filter(x => x.rowNumber === rowNumber && x.victimDelivery !== null) ? false : true;
        this.isDisabledTotal = accounts.filter(
          x => x.id === String(this.totalPaymentId) && x.victimDeliveryTotal !== null,
        )
          ? false
          : true;
        this.animalTotal =
          Number(accountsRowNumber.length) * Number(meat) + Number(accountsRowNumber.length) * Number(bone);
        this.animalTotalCount = Math.round((this.animalTotal * 100) / Number(animalWeight));
      });
    // this.cdRef.detach();
    // setInterval(() => {
    //   this.cdRef.detectChanges();
    // }, 1000);
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
      new CreateVictimDelivery({
        id: idTime,
        victimDelivery: currentTime,
      }),
    );
    setTimeout(() => {
      this.cdRef.detectChanges();
    }, 1000);
  }

  currentTimeTotal(currentTimeTotal, idTime) {
    this.store.dispatch(
      new CreateVictimDeliveryTotal({
        id: idTime,
        victimDeliveryTotal: currentTimeTotal,
      }),
    );
    setTimeout(() => {
      this.cdRef.detectChanges();
    }, 1000);
  }
}
