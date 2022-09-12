import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import * as AuthSession from 'expo-auth-session';

import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string,
  given_name: string,
  email: string,
  picture?: string
}

interface AuthContextProps {
  user: User,
  // signInWithGoogle: () => Promise<void>
  sigInWithGoogle: () => Promise<void>,
  signInWithApple: () => Promise<void>,
  signOut: () => Promise<void>,
  userStorageloading: boolean
}


interface AuthorizationResponse {
  params: {
    access_token: string
  },
  type: string
}



interface AuthContextProviderProps {
  children: ReactNode
}



const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)


export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState<User>({} as User)
  const [userStorageloading, setUserStorageLoading] = useState(true)

  const userStorageKey = '@gofinances:user'

  async function sigInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { params, type } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)

        const userInfo = await response.json() as User

        const userLogged = {
          id: String(userInfo.id),
          email: userInfo.email,
          given_name: userInfo.given_name,
          picture: userInfo.picture
        }

        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }

    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function signInWithApple() {
    try {

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      })
      if (credential) {
        const given_name = credential.fullName!.givenName!
        const picture = `https://ui-avatars.com/api/?name=${given_name}&length=1`

        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          given_name,
          picture
        }

        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }

    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function signOut() {
    setUser({} as User)
    await AsyncStorage.removeItem(userStorageKey)
  }

  useEffect(() => {
    async function loadUser() {
      const data = await AsyncStorage.getItem(userStorageKey)
      const user = await JSON.parse(data!) as User

      if (user) {
        setUser(user)
      }
      setUserStorageLoading(false)
    }

    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      sigInWithGoogle,
      signInWithApple,
      signOut,
      userStorageloading
    }}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuthContext = () => useContext(AuthContext)