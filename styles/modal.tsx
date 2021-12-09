import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    button: {
      backgroundColor: '#00A98F',
      '&:hover': {
        backgroundColor: '#F9A54A',
      },
    },
    buttonLineGradient: {
      background: 'linear-gradient(315deg, #20bf55 0%, #01baef 74%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      '&:hover': {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      },
    },
  })
)
