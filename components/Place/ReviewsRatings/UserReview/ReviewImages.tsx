import { ImageList, ImageListItem, ListItem } from '@material-ui/core'
import React from 'react'

interface Props {
  reviewID: string
  files: string[]
}

const ReviewImages = ({ reviewID, files }: Props) => {
  return (
    <ListItem alignItems="flex-start" component="div">
      <ImageList cols={files.length > 3 ? 3 : files.length}>
        {files.map((fileURL, index) => (
          <ImageListItem
            key={`review-${reviewID}-img-${index}`}
            style={{
              maxHeight: '100%',
              overflow: 'hidden',
            }}
          >
            <img
              src={fileURL}
              alt={`image ${index} of review${reviewID}`}
              style={{ maxWidth: '100%' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </ListItem>
  )
}

export default React.memo(ReviewImages)
