import { CardMedia } from '@material-ui/core'

interface Props {
  url: string
  name: string
}

const MainImage = ({ url, name }: Props) => {
  return (
    <CardMedia
      component="img"
      image={url}
      alt={`${name}'s main image'`}
      height={300}
      style={{ maxWidth: '40%' }}
    />
  )
}

export default MainImage
