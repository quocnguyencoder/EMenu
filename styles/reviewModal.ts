import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  reviewModalWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewModalPaper: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '15px',
    width: '50%',
    height: '80%',
    maxWidth: '700px',
    maxHeight: '500px',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      minHeight: '100vh',
      borderRadius: '0',
    },
    position: 'relative',
  },
  reviewModalSubmitButton: {
    margin: '2% 3% 2% 3%',
    backgroundColor: '#D14B28',
    color: '#fff',
    fontWeight: 600,
  },
}))
