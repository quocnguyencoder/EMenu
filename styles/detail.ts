import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  description: {
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      maxWidth: '65vw',
    },
  },
  chip: {
    backgroundColor: 'rgb(231, 231, 231)',
    '&:hover': {
      backgroundColor: 'rgb(200, 200, 200)',
    },
  },
  infoWrapper: {
    padding: '1rem 0',
    [theme.breakpoints.down('sm')]: {
      padding: '0.1rem 1rem',
    },
  },
  coverImg: {
    borderRadius: '16px',
    [theme.breakpoints.down('sm')]: {
      borderRadius: '0',
    },
  },
  topReviewsWrapper: {
    padding: '0.5rem 0',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem 1rem',
    },
  },
  menuWrapper: {
    padding: '0.5rem 0',
    [theme.breakpoints.down('sm')]: {
      padding: '0 1rem',
    },
  },
  noWrap2Line: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  addButton: {
    position: 'absolute',
    zIndex: 999,
    bottom: 8,
    right: 8,
    backgroundColor: '#fff',
    boxShadow:
      'transparent 0px 0px 0px 1px inset, rgb(0 0 0 / 20%) 0px 8px 24px',
  },
}))
