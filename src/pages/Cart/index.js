import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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

function Cart({
  navigation,
  cart,
  total,
  updateQuantityRequest,
  removeFromCart,
}) {
  function decrement(product) {
    updateQuantityRequest(product.id, product.quantity - 1);
  }

  function increment(product) {
    updateQuantityRequest(product.id, product.quantity + 1);
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
                  <ProductDelete onPress={() => removeFromCart(product.id)}>
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

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.quantity),
    formattedPrice: formatPrice(product.price),
  })),
  total: formatPrice(
    state.cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ),
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
