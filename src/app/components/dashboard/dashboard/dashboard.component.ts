import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  ViewChildren
} from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { map, filter, take } from "rxjs/operators";
import { AccountState } from "../../../core/state";
import { Account } from "../../../core/model";
import { CreateAccount, CreateAccountTotal } from "src/app/core/action";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  @Select(AccountState.getAccount) accounts$: Observable<Account[]>;
  @Input() page = 1;

  @Input() pageSize = 10;

  currentDate: string;

  payName: string;

  idName: string;
  selectedSortOrder: string = "Lütfen Küpe No Seçiniz";
  ProductDetails: object = [];
  totalPaymentId: string[];
  isDisabled: boolean;
  isDisabledTotal: boolean;
  isValid: boolean = false;

  animalTotal: number = 0;
  animalTotalCount: number = 0;

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
  stateForm: FormGroup;
  stateFormDropDown: FormGroup;
  showDropDown = false;

  SearchProduct(
    id: number,
    rowNumber: number,
    earringsNumber: number,
    relatedPerson: number
  ) {
    this.selectedSortOrder =
      "Sıra No: " +
      rowNumber +
      " Küpe No: " +
      earringsNumber +
      " İlgili Kişi: " +
      relatedPerson;
    this.accounts$
      .pipe(
        filter(account => !!account.length),
        take(1)
      )
      .subscribe(accounts => {
        const accountsRowNumber = accounts.filter(
          x => x.rowNumber === rowNumber
        );
        this.ProductDetails = accountsRowNumber;
        this.totalPaymentId = accounts
          .filter(
            x =>
              x.rowNumber === rowNumber && x.earringsNumber === earringsNumber
          )
          .map(y => y.id);
        this.isValid = !!accountsRowNumber;
        this.isDisabled = accounts.filter(
          x => x.rowNumber === rowNumber && x.paymentReceived !== null
        )
          ? false
          : true;
        this.isDisabledTotal = accounts.filter(
          x =>
            x.id === this.totalPaymentId[0] && x.paymentReceivedTotal !== null
        )
          ? false
          : true;
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
      map(accounts => accounts.filter(x => x.earringsNumber !== null))
    );
  }

  get account$(): Observable<any> {
    return this.accounts$.pipe(
      filter(account => !!account.length),
      take(1),
      map(
        accounts =>
          accounts
            .filter(
              account => account.earringsNumber !== null && account.rowNumber
            )
            .map((account, i) => ({ id: i + 1, ...account }))
        // .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize),
      )
    );
  }

  accountAnimalWeightAndCount(
    numberOfShares: number,
    meat: number,
    bone: number
  ): number {
    return (
      Math.round(
        (Number(numberOfShares) * Number(meat) +
          Number(numberOfShares) * Number(bone)) *
          100
      ) / 100
    );
  }

  accountAnimalWeight(
    animalWeight: number,
    numberOfShares: number,
    meat: number,
    bone: number
  ) {
    return Math.round(
      (this.accountAnimalWeightAndCount(numberOfShares, meat, bone) * 100) /
        Number(animalWeight)
    );
  }

  constructor(
    private store: Store,
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.initFormDropDown();
  }

  initForm(): FormGroup {
    return (this.stateForm = this.fb.group({
      search: [null]
    }));
  }

  initFormDropDown(): FormGroup {
    return (this.stateFormDropDown = this.fb.group({
      search: [null]
    }));
  }

  openDropDown() {
    this.showDropDown = false;
  }

  getSearchValue() {
    return this.stateForm.value.search;
  }

  getSearchValueDropDown() {
    return this.stateFormDropDown.value.search;
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
      new CreateAccount({
        id: idTime,
        paymentReceived: currentTime
      })
    );
    setTimeout(() => {
      this.cdRef.detectChanges();
    }, 1000);
  }

  currentTimeTotal(currentTimeTotal, idTime) {
    this.store.dispatch(
      new CreateAccountTotal({
        id: idTime,
        paymentReceivedTotal: currentTimeTotal
      })
    );
    setTimeout(() => {
      this.cdRef.detectChanges();
    }, 1000);
  }
}
