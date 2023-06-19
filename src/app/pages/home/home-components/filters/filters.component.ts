import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: `./filters.component.html`,
  
})
export class FiltersComponent implements OnInit, OnDestroy {
    // output is an event emmiter that helps us send data out of our components to the parent component

  @Output() showCategory = new EventEmitter<string>();
  
  categoriesSubscription: Subscription | undefined;
  categories: Array<string> | undefined;
  // categories = ['shoes','clarks','brocks'] initially we had hardcoded the value
  constructor( private storeService: StoreService) { }

  ngOnInit(): void {
   this.categoriesSubscription = this.storeService.getAllCategories()
    .subscribe((res) => {
      this.categories = res;
    })
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

}
