import { Box } from '@material-ui/core'
import React from 'react'
import { useStyles } from '@/styles/hero'
import Image from 'next/image'

const HeroImage = () => {
  const classes = useStyles()
  return (
    <Box
      display="block"
      width="58vw"
      height="300px"
      position="relative"
      overflow="hidden"
    >
      <Image
        alt="route-image"
        src="https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=,format=jpeg,quality=100/https://cdn.doordash.com/static/img/seo/multicuisinea.jpg"
        layout="responsive"
        width="100%"
        height="100%"
        className={classes.heroImage}
      />
      <Box
        position="absolute"
        display="block"
        top={0}
        left={0}
        width="100%"
        height="100%"
        style={{
          transform: 'translateX(100%)',
          transition: 'transform 800ms ease-in-out 0s',
        }}
      ></Box>
    </Box>
  )
}

export default HeroImage
