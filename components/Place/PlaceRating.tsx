import Rating from '@material-ui/lab/Rating'

export default function PlaceRating() {
  const value = 4

  return <Rating name="read-only" value={value} readOnly precision={0.5} />
}
