import styled from 'styled-components/native';

import logo from '../../assets/logo.png';

export const Wrapper = styled.SafeAreaView`
  flex; 0;
  flex-direction: row;
  background: #111;
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 20px;
`;

export const LogoWrapper = styled.TouchableOpacity`
  flex: 1;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 165px;
  height: 21px;
`;

export const ShoppingCart = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
  width: 24px;
  height: 24px;
`;

export const ShoppingCartQuantity = styled.Text`
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 18px;
  min-height: 18px;
  background: #7159c1;
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-size: 12px;
  padding: 2px;
  border-radius: 9px;
  overflow: hidden;
`;
