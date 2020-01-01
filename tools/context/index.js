import React, {useState} from 'react';
// import AsyncStorage from '@react-native-community/async-storage';

const CTX = React.createContext();

export {CTX};

export default function Store(props) {
  const [isAuth, setIsAuth] = useState(false);

  const authenticate = async token => {
    // console.log(token);
    // await AsyncStorage.setItem('@access_token', 'token');
    setIsAuth(true);
  };

  const logout = async () => {
    // await AsyncStorage.removeItem('@access_token');
    setIsAuth(false);
  };

  return (
    <CTX.Provider value={{isAuth, authenticate, logout}}>
      {props.children}
    </CTX.Provider>
  );
}
