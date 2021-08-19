import firebase from 'firebase/app'

export const mapUserData = (user: firebase.User) => {
  const { uid, email, refreshToken, displayName, photoURL } = user
  return {
    id: uid,
    email: email,
    token: refreshToken,
    name: displayName,
    profilePic: photoURL,
  }
}
