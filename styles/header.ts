import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  layout: {
    flex: 1,
  },
  drawerButtonIcon: {
    color: '#000000',
    fontSize: '4vh',
  },
  hideButtons: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      minWidth: '190px',
    },
  },
  sideBox: {
    display: 'flex',
    minWidth: '-webkit-min-content',
  },

  search: {
    width: '30vw',
    maxWidth: '450px',
    [theme.breakpoints.down('sm')]: {
      width: '60vw',
    },
  },
  searchIcon: {
    color: 'gray',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    paddingLeft: '10px',
    borderRadius: '24px',
    height: '2.4rem',
    backgroundColor: 'rgb(247, 247, 247)',
    border: '2px solid transparent',
    width: '100%',
  },
  responsiveDrawer: {
    width: '23vw',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
  },
  logoFull: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  logoSmall: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  searchResultWrapper: {
    width: '100%',
    zIndex: 9999,
    [theme.breakpoints.down('sm')]: {
      minWidth: '100vw',
    },
  },
}))
