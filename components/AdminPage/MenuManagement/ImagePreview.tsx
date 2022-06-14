import { Box, ButtonBase, CardMedia, Typography } from '@material-ui/core'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'

interface Props {
  previewImg: string
  inputEl: React.MutableRefObject<null>
  handlePreviewImg: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ImagePreview = ({ previewImg, inputEl, handlePreviewImg }: Props) => {
  return (
    <Box flex={1} mt="0.5em">
      <CardMedia
        component="img"
        image={`${previewImg}`}
        style={{
          maxWidth: '100%',
          height: '50%',
          objectFit: 'scale-down',
          borderStyle: 'solid',
          borderWidth: 'thin',
        }}
      />
      <input
        id="icon-button-file"
        type="file"
        ref={inputEl}
        style={{ display: 'none' }}
        onChange={(e) => handlePreviewImg(e)}
      />
      <Box display="flex" flexDirection="column">
        <label htmlFor="icon-button-file">
          <ButtonBase
            component="span"
            style={{
              backgroundColor: '#e7e7e7',
              width: '100%',
            }}
          >
            <AddAPhotoIcon fontSize="large" />
            <Typography variant="body2">Thêm ảnh</Typography>
          </ButtonBase>
        </label>
      </Box>
    </Box>
  )
}

export default ImagePreview
