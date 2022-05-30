import { Box, Paper, Typography } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import { CardMedia } from '@material-ui/core'
import { Bill } from '@/models/place'
import formatter from '@/functions/moneyFormatter'
import getBestSellingProduct from '@/functions/getBestSellingProduct'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'

interface BestSellProps {
  orderList: Bill[]
}

interface BestSelling {
  key: number
  name: string
  price: number
  quantity: number
  discount: number
  image: string
  total: number
}

const BestSellingProduct: React.FC<BestSellProps> = ({
  orderList,
}: BestSellProps) => {
  const bestSellingList = getBestSellingProduct(orderList)

  return (
    <Box m="1%" width="30%">
      <Paper>
        {bestSellingList.length > 0 ? (
          <Carousel
            autoPlay={false}
            indicatorIconButtonProps={{
              style: {
                display: 'none',
              },
            }}
          >
            {bestSellingList.map((item, i) => (
              <Item key={item.key} item={item} rank={i} />
            ))}
          </Carousel>
        ) : (
          <Box display="flex" alignItems="center" flexDirection="column">
            <SentimentDissatisfiedIcon style={{ fontSize: '10vh' }} />
            <Typography variant="subtitle1">
              Chưa hoàn thành đơn hàng nào
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  )
}

interface ItemProps {
  rank: number
  item: BestSelling
}

function Item(props: ItemProps) {
  return (
    <>
      <Box display="flex">
        <Typography
          variant="subtitle2"
          style={{
            fontWeight: 600,
            margin: '3%',
            width: '100%',
          }}
        >
          Sản phẩm bán chạy
        </Typography>
        <Typography
          variant="subtitle2"
          style={{ fontWeight: 600, margin: '3%' }}
        >
          #{props.rank + 1}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography
          variant="h6"
          style={{
            fontWeight: 800,
            marginLeft: '3%',
            width: '100%',
          }}
        >
          {props.item.name} ({props.item.quantity})
        </Typography>
        <Typography
          variant="subtitle2"
          style={{ fontWeight: 600, marginRight: '3%' }}
        >
          {formatter.format(props.item.total)}
        </Typography>
      </Box>
      <CardMedia
        component="img"
        src={props.item.image}
        alt={props.item.name}
        title={props.item.name}
        style={{
          objectFit: 'cover',
        }}
      />
    </>
  )
}
export default BestSellingProduct
