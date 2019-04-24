import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromProducts from './product.reducer';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
  products: fromProducts.ProductState;
}

// Selector functions
const getProductFeatureState = createFeatureSelector<fromProducts.ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state: any) => state.reducer.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state: any) => state.reducer.currentProduct
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProduct) => {
    if (currentProduct === null) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      };
    } else {
      return currentProduct;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state: any) => state.reducer.products
);

export const getError = createSelector(
  getProductFeatureState,
  (state: any) => state.reducer.error
);
