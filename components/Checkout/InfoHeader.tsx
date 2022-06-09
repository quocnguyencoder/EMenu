import {
  Box,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core'
import React from 'react'
import StorefrontIcon from '@material-ui/icons/Storefront'
import { Place } from '@/models/place'
import Link from 'next/link'
import { useStyles } from '@/styles/featuredPlace'
import * as ROUTES from '@/constants/routes'

interface Props {
  placeInfo: Place
}

const InfoHeader = ({ placeInfo }: Props) => {
  const classes = useStyles()
  return (
    <Paper variant="outlined" style={{ marginBottom: '1rem' }}>
      <Typography
        variant="h5"
        style={{ fontWeight: 'bold', textAlign: 'center', paddingTop: '1rem' }}
      >
        Thông tin đơn hàng
      </Typography>
      <ListItem component="span">
        <ListItemText
          style={{ width: '40%', minWidth: '9rem' }}
          primary={
            <Box display="flex" alignItems="center" style={{ gap: '0.5rem' }}>
              <StorefrontIcon fontSize="large" />
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                Địa điểm
              </Typography>
            </Box>
          }
        />
        <ListItemText
          primary={
            <Link href={ROUTES.PLACE_DETAIL(placeInfo.id)}>
              <Typography
                variant="body1"
                color="primary"
                className={classes.link}
                style={{ fontWeight: 'bold' }}
              >
                {placeInfo.name}
              </Typography>
            </Link>
          }
        />
      </ListItem>
    </Paper>
  )
}

export default InfoHeader
