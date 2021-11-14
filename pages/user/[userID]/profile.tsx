import { Box, Button, Container, TextField } from '@material-ui/core'
import { useState } from 'react'
import firebase from 'firebase/app'
import useUser from '@/firebase/useUser'

const profile = () => {
  const { user } = useUser()

  const [displayName, setDisplayName] = useState(user.name)
  const [profilePic, setProfilePic] = useState(user.profilePic)

  const updateUserProfile = () => {
    const userNow = firebase.auth().currentUser
    userNow != null &&
      userNow
        .updateProfile({
          displayName: displayName,
          photoURL: profilePic,
        })
        .then()
  }
  return (
    <Container>
      <Box display="flex" flexDirection="column">
        <TextField
          label="id"
          multiline
          rows={2}
          variant="outlined"
          value={user.id}
        />
        <TextField
          label="email"
          multiline
          rows={2}
          variant="outlined"
          value={user.email}
        />
        <TextField
          label="token"
          multiline
          rows={2}
          variant="outlined"
          value={user.token}
        />
        <TextField
          label="name"
          multiline
          rows={2}
          variant="outlined"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <TextField
          label="profilePic"
          multiline
          rows={2}
          variant="outlined"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />
        <Button
          onClick={updateUserProfile}
          style={{ height: '100px', padding: '10px' }}
        >
          Update Profile
        </Button>
      </Box>
    </Container>
  )
}

export default profile
