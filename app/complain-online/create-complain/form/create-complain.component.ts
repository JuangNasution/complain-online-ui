import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { isFieldInvalid, normalizeFlag } from '../../../util';
import { categories, CreateCategoryModel } from '../create-category.model';
import { CardService, ComplainService } from '../../service';
import { Subject } from 'rxjs';
import { CardList, Complain } from '../../model';

@Component({
  templateUrl: './create-complain.component.html',
})
export class CreateComplainComponent implements OnInit {

  title: string = '';
  form: FormGroup;
  id: number = 0;

  Complains: Complain[] = [];
  categories: CreateCategoryModel[];
  noCard: CardList[] = [];

  noCardTypeahead$: Subject<string> = new Subject<string>();
  isFieldInvalid = isFieldInvalid;

  noCardLoading: boolean = false;
  editable: boolean = false;

  constructor(
    public location: Location,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cardService: CardService,
    private complainService: ComplainService,
  ){
    this.form = formBuilder.group({
      cardId: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      complainDetail: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
    })
    this.categories = categories;
  }

  ngOnInit(){
    this.editable = this.activatedRoute.snapshot.data.editable;
    this.title = this.activatedRoute.snapshot.data.title;
    this.searchNoCard();

    if (!this.editable) {
      this.form.disable();
    }
  }

  searchNoCard() {
    this.noCardTypeahead$
      .pipe(
        tap(() => {
          this.noCard = [],
          this.noCardLoading = true;
        }),
        debounceTime(300),
        switchMap(searchText => this.cardService.searchCard(searchText)) // - Backend searchSuggestions
      )
      .subscribe(data => {
        this.noCard = data;
        this.noCardLoading = false;
      });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
      this.complainService
        .add(normalizeFlag(this.form))
        .subscribe(() => this.location.back());
  }

}
