import { Avatar, Box } from '@material-ui/core'
import React from 'react'
import { useStyles } from '@/styles/detail'
import Image from 'next/image'

interface Props {
  coverImg: string
}

const CoverWithLogo = ({ coverImg }: Props) => {
  const classes = useStyles()
  return (
    <Box width="100%" pt="2%" maxHeight="310px">
      <Box height="250px" width="100%" position="relative">
        <Image
          src={coverImg}
          alt={'cover image'}
          layout="fill"
          className={classes.coverImg}
        />
      </Box>

      <Avatar
        src={coverImg}
        alt="place logo"
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
