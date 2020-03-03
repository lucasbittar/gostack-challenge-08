export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_ITEM_REQUEST',
    id,
  };
}

export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_ITEM_SUCCESS',
    product,
  };
}

export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE_ITEM',
    id,
  };
}

export function updateQuantityRequest(id, quantity) {
  return {
    type: '@cart/UPDATE_QUANTITY_REQUEST',
    id,
    quantity,
  };
}

export function updateQuantitySuccess(id, quantity) {
  return {
    type: '@cart/UPDATE_QUANTITY_SUCCESS',
    id,
    quantity,
  };
}
