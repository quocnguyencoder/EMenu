import { Grid } from '@material-ui/core'
import NewestItem from './NewestItem'
import React from 'react'

const Newest = () => {
  return (
    <Grid container spacing={2}>
      <Grid item md={3}>
        <NewestItem />
      </Grid>
      <Grid item md={3}>
        <NewestItem />
      </Grid>
      <Grid item md={3}>
        <NewestItem />
      </Grid>
      <Grid item md={3}>
        <NewestItem />
      </Grid>
    </Grid>
  )
}

export default Newest
