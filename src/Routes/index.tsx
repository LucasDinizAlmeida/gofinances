import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './App.routes';
import { AuthRoutes } from './Auth.routes';
import { useAuthContext } from '../hooks/AuthContext';

export function Routes() {

  const { user } = useAuthContext()

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}