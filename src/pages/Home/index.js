import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {formatPrice} from '../../util/format';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  Product,
  ProductImage,
  ProductQuantity,
  ProductQuantityText,
  ProductTitle,
  ProductPrice,
  AddToCartButton,
  AddToCartButtonText,
} from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    const response = await api.get('/products');
    const data = response.data.map(product => ({
      ...product,
      formattedPrice: formatPrice(product.price),
    }));
    this.setState({products: data});
  };

  handleAddtoCart = id => {
    const {addToCartRequest} = this.props;
    addToCartRequest(id);
  };

  renderProductTile = ({item}) => {
    const {quantity} = this.props;

    return (
      <Product key={item.id}>
        <ProductImage source={{uri: item.image}} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{item.formattedPrice}</ProductPrice>
        <AddToCartButton onPress={() => this.handleAddtoCart(item.id)}>
          <ProductQuantity>
            <Icon name="add-shopping-cart" color="#fff" size={20} />
            <ProductQuantityText>{quantity[item.id] || 0}</ProductQuantityText>
          </ProductQuantity>
          <AddToCartButtonText>Add to cart</AddToCartButtonText>
        </AddToCartButton>
      </Product>
    );
  };

  render() {
    const {products} = this.state;
    return (
      <Container>
        <FlatList
          horizontal
          data={products}
          extraData={this.props}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderProductTile}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  quantity: state.cart.reduce((quantity, product) => {
    quantity[product.id] = product.quantity;
    return quantity;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
