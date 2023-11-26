// AuthProvider.js
import React, { useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const setGlobalUserId = (id) => {
    setUserId(id);
  };

  return (
    <AuthContext.Provider value={{ userId, setGlobalUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
