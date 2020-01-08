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
    const userToken = await AsyncStorage.getItem('userToken');
    setToken(userToken);
  };

  const _authenticate = async accessToken => {
    await AsyncStorage.setItem('userToken', accessToken);
  };

  const _logout = async () => {
    // await AsyncStorage.removeItem('userToken');
    await AsyncStorage.clear();
  };

  return (
    <CTX.Provider value={{token, _authenticate, _logout}}>
      {props.children}
    </CTX.Provider>
  );
}
