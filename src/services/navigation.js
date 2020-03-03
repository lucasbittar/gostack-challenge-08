import {CommonActions} from '@react-navigation/native';

let navigation;

function setNavigator(ref) {
  console.tron.log('REF', ref);
  navigation = ref;
}

function navigate(routeName, params) {
  navigation.dispatch(
    CommonActions.navigate({
      routeName,
      params,
    }),
  );
}

export default {
  navigate,
  setNavigator,
};
