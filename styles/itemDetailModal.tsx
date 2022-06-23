import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  detailModalWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailModalPaper: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '15px',
    height: '95vh',
    width: '35rem',
    outline: 'none',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      minHeight: '100vh',
      borderRadius: '0',
    },
  },
  topAppBar: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '0.7rem 0',
    gap: '1rem',
  },
  disableHoverEffect: {
    color: '#000',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  nutritionCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.1rem',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  addToCartButton: {
    textTransform: 'none',
    backgroundColor: '#ed4c07',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '16px',
    paddingLeft: '0.8rem',
    paddingRight: '0.8rem',
    '&:hover': {
      backgroundColor: '#de4002',
    },
  },
  bottomAppBar: {
    height: '10%',
    borderBottomLeftRadius: '16px',
    borderBottomRightRadius: '16px',
    [theme.breakpoints.down('sm')]: {
      borderRadius: '0',
    },
  },
  actionsToolBar: {
    justifyContent: 'flex-end',
    height: '100%',
    gap: '5%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
      gap: '2%',
    },
  },
  actionsButtons: {
    gap: '5%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
      flex: 1,
    },
  },
}))
