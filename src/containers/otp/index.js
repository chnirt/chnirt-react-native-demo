/* eslint-disable react-hooks/rules-of-hooks */
import React, {useContext} from 'react';
import {View, Text} from 'react-native';

import {CTX} from '../../tools/context';

function index(props) {
  const authContext = useContext(CTX);
  const {token} = authContext;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>OTP {token}</Text>
    </View>
  );
}

export default index;
