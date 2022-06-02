import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  responsiveDrawer: {
    width: '100vw',
    [theme.breakpoints.up('sm')]: {
      width: '24vw',
    },
  },
  cartIconButton: {
    backgroundColor: '#ed4c07',
    color: '#fff',
    borderRadius: '15px',
    maxHeight: '30px',
    '&:hover': {
      backgroundColor: '#de4002',
    },
  },
  checkoutButton: {
    backgroundColor: '#ed4c07',
    color: '#fff',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '3% 0 4% 0',
    padding: '3% 5%',
    '&:hover': {
      backgroundColor: '#de4002',
    },
  },
  goToPlaceDetailIcon: {
    fontSize: '0.7rem',
    fontWeight: 'bold',
    color: 'black',
    marginLeft: '2%',
  },
}))
