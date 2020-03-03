import {Alert} from 'react-native';
import {call, select, put, all, takeLatest} from 'redux-saga/effects';
// import Navigation from '../../../services/navigation';

import api from '../../../services/api';
import {formatPrice} from '../../../util/format';

import {addToCartSuccess, updateQuantitySuccess} from './actions';

function* addToCart({id}) {
  const product = yield select(state => state.cart.find(p => p.id === id));

  const stock = yield call(api.get, `/stock/${id}`);

  const stockQuantity = stock.data.quantity;
  const currentQuantity = product ? product.quantity : 0;

  const quantity = currentQuantity + 1;

  if (quantity > stockQuantity) {
    Alert.alert('Product out of stock');
    return;
  }

  if (product) {
    yield put(updateQuantitySuccess(id, quantity));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      quantity: 1,
      formattedPrice: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));

    // Navigation.navigate('Cart');
  }
}

function* updateQuantity({id, quantity}) {
  if (quantity <= 0) {
    return;
  }

  const stock = yield call(api.get, `stock/${id}`);
  const stockQuantity = stock.data.quantity;

  if (quantity > stockQuantity) {
    Alert.alert('Product out of stock');
    return;
  }

  yield put(updateQuantitySuccess(id, quantity));
}

export default all([
  takeLatest('@cart/ADD_ITEM_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_QUANTITY_REQUEST', updateQuantity),
]);
