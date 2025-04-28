// 2.2 NgRx (or NGXS) State Handling

// Task: 
// - Create a state management flow for a shopping cart using NgRx or NGXS:
// - Implement actions to add/remove/update cart items.
// - Use selectors to derive total price and item count
// - Persist the cart state to localStorage.

// Focus: 
// NgRx/NGXS patterns, selectors, and side effects. 

// Bonus: 
// Implement lazy-loaded modules with isolated state.



// models/cart-item.model.ts
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// store/cart.actions.ts
import { createAction, props } from '@ngrx/store';
import { CartItem } from '../models/cart-item.model';

export const addItem = createAction(
  '[Cart] Add Item',
  props<{ item: CartItem }>()
);

export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{ id: string }>()
);

// store/cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addItem, removeItem } from './cart.actions';
import { CartItem } from '../models/cart-item.model';

export const initialState: CartItem[] = [];

export const cartReducer = createReducer(
  initialState,
  on(addItem, (state, { item }) => [...state, item]),
  on(removeItem, (state, { id }) => state.filter(item => item.id !== id))
);

// store/cart.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartItem } from '../models/cart-item.model';

export const selectCartState = createFeatureSelector<CartItem[]>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (cartItems) => cartItems
);

export const selectCartTotal = createSelector(
  selectCartState,
  (cartItems) =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
);

// cart.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { addItem, removeItem } from '../store/cart.actions';
import { selectCartItems, selectCartTotal } from '../store/cart.selectors';

@Component({
  selector: 'app-cart',
  template: `
    <div *ngFor="let item of cartItems$ | async">
      {{ item.name }} - {{ item.quantity }} x ${{ item.price }}
      <button (click)="remove(item.id)">Remove</button>
    </div>
    <div>Total: ${{ total$ | async }}</div>
  `
})
export class CartComponent {
  cartItems$: Observable<CartItem[]> = this.store.select(selectCartItems);
  total$: Observable<number> = this.store.select(selectCartTotal);

  constructor(private store: Store) {}

  remove(id: string) {
    this.store.dispatch(removeItem({ id }));
  }
}

// app.module.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/cart.reducer';

@NgModule({
  declarations: [/* your components */],
  imports: [
    /* other imports */
    StoreModule.forRoot({ cart: cartReducer })
  ],
  bootstrap: [/* your root component */]
})
export class AppModule {}