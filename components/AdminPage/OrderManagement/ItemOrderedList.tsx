import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import formatter from '@/functions/moneyFormatter'
import { Order } from '@/models/place'

interface Props {
  itemList: Order[]
}

const ItemOrderedList: React.FC<Props> = ({ itemList }: Props) => {
  const indices = Object.keys(itemList).map(Number)
  const objectKeys = indices.map((index) =>
    Number(Object.getOwnPropertyNames(itemList[index]))
  )

  return (
    <div style={{ overflow: 'auto', maxHeight: 300 }}>
      {indices.map((index, i) => (
        <List
          key={`itemName-${itemList[index][objectKeys[index]].name}-with-${i}`}
          subheader={<li />}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt={itemList[index][objectKeys[index]].name}
                src={itemList[index][objectKeys[index]].image}
                variant="square"
                style={{ height: '50px', width: '50px', objectFit: 'cover' }}
              />
            </ListItemAvatar>
            <ListItemText
              style={{ marginLeft: '2%', maxWidth: '60%' }}
              primary={
                <Typography variant="body1" style={{ fontWeight: 700 }}>
                  {itemList[index][objectKeys[index]].name} x
                  {itemList[index][objectKeys[index]].quantity}
                </Typography>
              }
            />
            <ListItemSecondaryAction style={{ display: 'flex' }}>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle2"
                    style={{
                      textDecorationStyle: 'solid',
                    }}
                  >
                    {formatter.format(
                      (itemList[index][objectKeys[index]].price -
                        itemList[index][objectKeys[index]].discount) *
                        itemList[index][objectKeys[index]].quantity
                    )}
                  </Typography>
                }
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      ))}
    </div>
  )
}

export default ItemOrderedList
