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
  categoriesNavWrapper: {
    backgroundColor: '#fff',
    padding: '1%',
    alignSelf: 'flex-start',
    position: 'sticky',
    top: 70,
  },
  QRNoticeWrapper: {
    backgroundColor: '#fff',
    padding: '3%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '10px',
  },
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
  },
  reviewModalSubmitButton: {
    margin: '2% 3% 2% 3%',
    backgroundColor: '#D14B28',
    color: '#fff',
    fontWeight: 600,
  },
}))
