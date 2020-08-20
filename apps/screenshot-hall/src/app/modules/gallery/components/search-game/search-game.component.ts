import {
  AfterViewInit,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { GameService } from '../../services/game/game.service';
import { Observable, of, Subscription } from 'rxjs';
import { IGame } from '@screenshot-hall/models';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  skipWhile,
  switchMap,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'screenshot-hall-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchGameComponent),
      multi: true,
    },
  ],
})
export class SearchGameComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  form: FormGroup;
  isLoading = false;
  games$: Observable<IGame[]>;

  @Input() required = false;

  private value: IGame | null = null;

  private sub: Subscription = new Subscription();

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(private fb: FormBuilder, private gameService: GameService) {
    this.form = this.fb.group({
      search: new FormControl(''),
    });
  }

  ngOnInit() {
    this.games$ = this.form.get('search').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => (this.isLoading = true)),
      switchMap((search) => {
        if (typeof search === 'object') {
          return of([]).pipe(finalize(() => (this.isLoading = false)));
        }
        return this.gameService.searchGame(search).pipe(
          catchError(() => of([])),
          finalize(() => (this.isLoading = false))
        );
      }),
      catchError(() => of([]))
    );

    this.sub.add(
      this.form
        .get('search')
        .valueChanges.pipe(skipWhile((value) => typeof value === 'string'))
        .subscribe((value) => {
          this.writeValue(value);
          this.onChange(value);
          this.onTouch(value);
        })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  writeValue(obj: any): void {
    this.value = obj;
  }

  displayFn(game: IGame) {
    if (!game) {
      return;
    }
    if (typeof game === 'string') {
      return;
    }
    return `${game.name}`;
  }

  reset() {
    this.writeValue(null);
    this.form.get('search').patchValue(null);
  }
}
