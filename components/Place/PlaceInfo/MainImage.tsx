import { CardMedia } from '@material-ui/core'

interface Props {
  url: string
  alt: string
}

const MainImage = ({ url, alt }: Props) => {
  return (
    <CardMedia
      component="img"
      image={url}
      alt={alt}
      height={300}
      style={{ maxWidth: '40%' }}
    />
  )
}

export default MainImage
