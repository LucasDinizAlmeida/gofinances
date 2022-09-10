import React, { createContext, ReactNode, useContext, useState } from 'react'

import * as AuthSession from 'expo-auth-session';

interface User {
  id: string,
  given_name: string,
  email: string,
  picture?: string
}

interface AuthContextProps {
  user: User,
  // signInWithGoogle: () => Promise<void>
  sigInWithGoogle: () => Promise<void>
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
  console.log(user)



  async function sigInWithGoogle() {
    try {
      const CLIENT_ID = '967860136217-b0j04gmsns9vlecquihnsajupd98kdsi.apps.googleusercontent.com'
      const REDIRECT_URI = 'https://auth.expo.io/@lucas_slayer/gofinances2'
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { params, type } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)

        const userInfo = await response.json() as User

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          given_name: userInfo.given_name,
          picture: userInfo.picture
        })
      }

    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      sigInWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuthContext = () => useContext(AuthContext)