import firebase from 'firebase/app'

export const mapUserData = (user: firebase.User) => {
  const { uid, email, refreshToken, displayName, photoURL } = user
  return {
    id: uid,
    email: email != null ? email : '',
    token: refreshToken,
    name: displayName != null ? displayName : '',
    profilePic: photoURL != null ? photoURL : '',
  }
}
