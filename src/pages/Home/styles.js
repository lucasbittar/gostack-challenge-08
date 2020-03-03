import styled from 'styled-components/native';
import {darken} from 'polished';

export const Container = styled.View`
  background: #111;
`;

export const Product = styled.View`
  background: #fff;
  padding: 10px;
  margin: 15px;
  width: 240px;
  border-radius: 4px;
`;

export const ProductImage = styled.Image`
  width: 200px;
  height: 200px;
`;

export const ProductQuantity = styled.View`
  padding: 12px;
  background: ${darken(0.03, '#7159c1')};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const ProductQuantityText = styled.Text`
  color: #fff;
  margin: 0px 4px 0px 10px;
`;

export const ProductTitle = styled.Text`
  font-size: 16px;
`;

export const ProductPrice = styled.Text`
  margin: 14px 0px;
  font-size: 20px;
  margin-bottom: 14px;
  font-weight: bold;
`;

export const AddToCartButton = styled.TouchableOpacity`
  background: #7159c1;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  margin-top: auto;
`;

export const AddToCartButtonText = styled.Text`
  flex: 1;
  text-align: center;
  font-weight: bold;
  color: #fff;
`;
