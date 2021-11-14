import { Box, CircularProgress } from '@material-ui/core'
import React from 'react'

const Loading = () => {
  return (
    <Box
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        textAlign: 'center',
        opacity: 0.7,
        backgroundColor: '#fff',
        zIndex: 999,
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading
