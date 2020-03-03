import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

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

export default function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const quantity = useSelector(state =>
    state.cart.reduce((quantity, product) => {
      quantity[product.id] = product.quantity;
      return quantity;
    }, {}),
  );

  useEffect(() => {
    async function fetchProducts() {
      const response = await api.get('/products');
      const data = response.data.map(product => ({
        ...product,
        formattedPrice: formatPrice(product.price),
      }));

      setProducts(data);
    }
    fetchProducts();
  }, []);

  function handleAddtoCart(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  function renderProductTile({item}) {
    return (
      <Product key={item.id}>
        <ProductImage source={{uri: item.image}} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{item.formattedPrice}</ProductPrice>
        <AddToCartButton onPress={() => handleAddtoCart(item.id)}>
          <ProductQuantity>
            <Icon name="add-shopping-cart" color="#fff" size={20} />
            <ProductQuantityText>{quantity[item.id] || 0}</ProductQuantityText>
          </ProductQuantity>
          <AddToCartButtonText>Add to cart</AddToCartButtonText>
        </AddToCartButton>
      </Product>
    );
  }

  return (
    <Container>
      <FlatList
        horizontal
        data={products}
        extraData={this.props}
        keyExtractor={item => String(item.id)}
        renderItem={renderProductTile}
      />
    </Container>
  );
}
