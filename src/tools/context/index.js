import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const CTX = React.createContext();

export {CTX};

export default function Store(props) {
  const [token, setToken] = useState('');

  useEffect(() => {
    _bootstrapAsync();
  });

  const _bootstrapAsync = async () => {
    setToken(await AsyncStorage.getItem('userToken'));
  };

  const authenticate = async accessToken => {
    await AsyncStorage.setItem('@access_token', accessToken);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@access_token');
  };

  return (
    <CTX.Provider value={{token, authenticate, logout}}>
      {props.children}
    </CTX.Provider>
  );
}
