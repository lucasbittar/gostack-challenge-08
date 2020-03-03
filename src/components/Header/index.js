import React from 'react';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  LogoWrapper,
  Logo,
  ShoppingCart,
  ShoppingCartQuantity,
  Wrapper,
} from './styles';

function Header({navigation, cartTotalItems}) {
  function goHome() {
    navigation.navigate('Home');
  }

  function goCart() {
    navigation.navigate('Cart');
  }

  return (
    <Wrapper>
      <Container>
        <LogoWrapper onPress={() => goHome()}>
          <Logo />
        </LogoWrapper>
        <ShoppingCart onPress={() => goCart()}>
          <Icon name="shopping-basket" color="#FFF" size={24} />
          <ShoppingCartQuantity>{cartTotalItems || 0}</ShoppingCartQuantity>
        </ShoppingCart>
      </Container>
    </Wrapper>
  );
}

const mapStateToProps = state => ({
  cartTotalItems: state.cart.length,
});

export default connect(mapStateToProps)(Header);
