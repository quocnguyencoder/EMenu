import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  orderWrapper: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    position: 'sticky',
    top: 70,
    display: 'flex',
    flexDirection: 'column',
  },
  orderSubmitBtn: {
    flex: 1,
    color: '#fff',
    '&:hover': {
      backgroundColor: '#E37F68',
    },
    backgroundColor: '#D14B28',
    margin: '2%',
  },
  orderEmptyNotice: {
    backgroundColor: '#FBF9D8',
    display: 'flex',
    justifyContent: 'center',
  },
  orderClearBtn: {
    color: 'red',
    border: '1px solid',
    borderColor: 'red',
    paddingLeft: '3px',
    paddingRight: '3px',
  },
}))
