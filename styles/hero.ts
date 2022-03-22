import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  heroImage: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    clipPath: 'polygon(100% 0%, 100% 100%, calc(300px + 0%) 100%, 0% 0%)',
    objectPosition: 'center center',
  },
  addressInputContainer: {
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: '3%',
    maxWidth: '600px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '10%',
    },
  },
  addressInput: {
    width: '100%',
  },
  searchButton: {
    backgroundColor: 'red',
    borderTopRightRadius: '24px',
    borderBottomRightRadius: '24px',
    height: '100%',
    width: '35%',
    color: 'white',
  },
  buttonFullText: {
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  buttonText: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      fontWeight: 'bold',
      display: 'block',
    },
  },
}))
