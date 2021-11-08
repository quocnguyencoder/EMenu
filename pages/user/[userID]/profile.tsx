import { Box, Button, Container, TextField } from '@material-ui/core'
import React from 'react'
import firebase from 'firebase'
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
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgWmvX9sTMK9-lpU512G_nBYam-tINPJJtqw&usqp=CAU',
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
