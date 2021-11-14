import { Box, Button, Container, TextField } from '@material-ui/core'
import React from 'react'
import firebase from 'firebase/app'
import useUser from '../../../firebase/useUser'

const profile = () => {
  const { user } = useUser()
  const updateUserProfile = () => {
    const userNow = firebase.auth().currentUser
    userNow != null &&
      userNow
        .updateProfile({
          displayName: 'Quoc',
          photoURL:
            'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/4b2e6822cad242c6bef586c29129fe83_Large.jpg',
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
          value={user.name}
        />
        <TextField
          label="profilePic"
          multiline
          rows={2}
          variant="outlined"
          value={user.profilePic}
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
