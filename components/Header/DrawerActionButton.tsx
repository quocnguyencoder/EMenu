import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core'

interface Props {
  text: string
  caption: string
  icon: React.ReactNode
  action: () => void
}

const DrawerActionButton = ({ text, icon, action, caption }: Props) => {
  return (
    <>
      <ListItem button onClick={action}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              {text}
            </Typography>
          }
          secondary={caption}
        />
      </ListItem>
      <Divider light />
    </>
  )
}

export default DrawerActionButton
