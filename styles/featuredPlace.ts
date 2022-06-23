import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  responsiveGrid: {
    gridTemplate: `
                  'header'
                  'cards'
                  'caption'
                `,
    [theme.breakpoints.up('md')]: {
      gridTemplate: `
                  'header cards'
                  'caption cards'
                  'caption cards'
                  'caption cards'
                `,
    },
  },
  responsiveImgList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    padding: '10px',
    width: '100%',
  },
  seeMoreButton: {
    borderRadius: '15px',
    backgroundColor: '#e7e7e7',
    marginTop: '2%',
    maxWidth: '50%',
    fontSize: '0.7rem',
    [theme.breakpoints.down('md')]: {
      maxWidth: '90%',
      padding: '2% 5%',
      marginTop: '0',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heading: {
    width: '27rem',
    [theme.breakpoints.down('md')]: {
      paddingTop: '7%',
      paddingBottom: '5%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  caption: {
    fontSize: '1rem',
    [theme.breakpoints.down('md')]: {
      paddingTop: '7%',
      paddingBottom: '5%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  card: {
    paddingTop: '1%',
    marginBottom: '0rem',
    marginTop: '1%',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '32rem',
      marginBottom: '1rem',
    },
  },
  link: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  image: {
    objectFit: 'fill',
    borderRadius: '5px',
  },
}))
