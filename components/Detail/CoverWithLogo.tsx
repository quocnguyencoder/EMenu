import { Avatar, Box, CardMedia } from '@material-ui/core'
import React from 'react'
import { useStyles } from '@/styles/detail'

interface Props {
  coverImg: string
}

const CoverWithLogo = ({ coverImg }: Props) => {
  const classes = useStyles()
  return (
    <Box width="100%" pt="2%" maxHeight="310px">
      <CardMedia
        component="img"
        image={coverImg}
        alt={'cover'}
        height={250}
        className={classes.coverImg}
      />
      <Avatar
        src={coverImg}
        style={{
          height: '5rem',
          width: '5rem',
          top: '-2.5rem',
          left: '2rem',
          border: '2px solid #fff',
          boxShadow: 'rgb(0 0 0 /20%) 0px 2px 8px',
        }}
      />
    </Box>
  )
}
export default CoverWithLogo
