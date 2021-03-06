import initFirebase from '@/firebase/initFirebase'
import { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'
// import { setUserCookie } from '@/firebase/userCookies'
// import { mapUserData } from '@/firebase/mapUserData'
import { useRouter } from 'next/router'

initFirebase() // initialize firebase

const FirebaseAuth = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false)
  const router = useRouter()
  let returnURL = router.query.returnURL
  returnURL ??= '/'
  const firebaseAuthConfig = {
    signInFlow: 'popup',
    // Auth providers
    // https://github.com/firebase/firebaseui-web#configure-oauth-providers
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
      },
      // add additional auth flows below
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: returnURL,
    credentialHelper: 'none',
    // callbacks: {
    //   signInSuccessWithAuthResult: async ({ user }: any) => {
    //     const userData = mapUserData(user)
    //     setUserCookie(userData)
    //   },
    // },
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true)
    }
  }, [])
  return (
    <div style={{ minWidth: '30vw' }}>
      {renderAuth ? (
        <StyledFirebaseAuth
          // @ts-expect-error: this is not typescript supported
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  )
}

export default FirebaseAuth
