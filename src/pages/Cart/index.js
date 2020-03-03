import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {formatPrice} from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

import {
  Checkout,
  CheckoutText,
  Container,
  EmptyContainer,
  EmptyText,
  Product,
  ProductActions,
  ProductActionsButton,
  ProductDelete,
  ProductDetails,
  ProductImage,
  ProductInfo,
  ProductPrice,
  ProductQuantity,
  ProductSubtotal,
  ProductTitle,
  Products,
  ShopNowButton,
  ShopNowButtonText,
  TotalAmount,
  TotalContainer,
  TotalText,
} from './styles';

export default function Cart({navigation}) {
  const dispatch = useDispatch();
  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.quantity),
      formattedPrice: formatPrice(product.price),
    })),
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
      ),
    ),
  );

  function decrement(product) {
    dispatch(
      CartActions.updateQuantityRequest(product.id, product.quantity - 1),
    );
  }

  function increment(product) {
    dispatch(
      CartActions.updateQuantityRequest(product.id, product.quantity + 1),
    );
  }

  return (
    <Container>
      {cart.length ? (
        <>
          <Products>
            {cart.map(product => (
              <Product key={product.id}>
                <ProductInfo>
                  <ProductImage source={{uri: product.image}} />
                  <ProductDetails>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductPrice>{product.formattedPrice}</ProductPrice>
                  </ProductDetails>
                  <ProductDelete
                    onPress={() =>
                      dispatch(CartActions.removeFromCart(product.id))
                    }>
                    <Icon name="delete-forever" size={24} color="#7159c1" />
                  </ProductDelete>
                </ProductInfo>
                <ProductActions>
                  <ProductActionsButton onPress={() => decrement(product)}>
                    <Icon
                      name="remove-circle-outline"
                      size={20}
                      color="#7159c1"
                    />
                  </ProductActionsButton>
                  <ProductQuantity value={String(product.quantity)} />
                  <ProductActionsButton onPress={() => increment(product)}>
                    <Icon name="add-circle-outline" size={20} color="#7159c1" />
                  </ProductActionsButton>
                  <ProductSubtotal>{product.subtotal}</ProductSubtotal>
                </ProductActions>
              </Product>
            ))}
          </Products>
          <TotalContainer>
            <TotalText>TOTAL</TotalText>
            <TotalAmount>{total}</TotalAmount>
            <Checkout>
              <CheckoutText>CHECKOUT</CheckoutText>
            </Checkout>
          </TotalContainer>
        </>
      ) : (
        <EmptyContainer>
          <Icon name="remove-shopping-cart" size={64} color="#eee" />
          <EmptyText>Your cart is empty.</EmptyText>
          <ShopNowButton onPress={() => navigation.navigate('Home')}>
            <ShopNowButtonText>Shop Now</ShopNowButtonText>
          </ShopNowButton>
        </EmptyContainer>
      )}
    </Container>
  );
}
