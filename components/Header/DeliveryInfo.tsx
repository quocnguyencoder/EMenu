import { Box, Button, TextField } from '@material-ui/core'

interface DeliveryProps {
  deliveryInfo: {
    address: string
    phone: string
    submit: boolean
  }
  setDeliveryInfo: React.Dispatch<
    React.SetStateAction<{
      address: string
      phone: string
      submit: boolean
    }>
  >
}

const DeliveryInfo: React.FC<DeliveryProps> = ({
  deliveryInfo,
  setDeliveryInfo,
}: DeliveryProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      address: { value: string }
      phone: { value: string }
    }
    setDeliveryInfo({
      address: target.address.value,
      phone: target.phone.value,
      submit: true,
    })
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Box display="flex" flexDirection="column">
        <TextField
          label="Địa chỉ"
          name="address"
          variant="outlined"
          required
          defaultValue={deliveryInfo.address}
          inputProps={{
            pattern: '.*[^ |\t].*',
            title: 'Ít nhất có 1 ký tự',
          }}
          style={{ marginBottom: '5%' }}
        />
        <TextField
          label="Số điện thoại"
          name="phone"
          variant="outlined"
          required
          defaultValue={deliveryInfo.phone}
          inputProps={{
            pattern: '([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})',
            title: '0x88888888 hoặc +84x88888888',
          }}
        />
        <Button
          type="submit"
          style={{
            padding: '10px',
            marginTop: '5%',
            textTransform: 'none',
            backgroundColor: '#3f37fe',
            color: 'white',
            fontWeight: 600,
          }}
        >
          Xác nhận
        </Button>
      </Box>
    </form>
  )
}

export default DeliveryInfo
