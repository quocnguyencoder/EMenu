import { Button } from '@material-ui/core/'
import { Order } from '@/models/place'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import ErrorDialog from '../common/ErrorDialog'
import { useState } from 'react'
import { ethers } from 'ethers'
import { toETH } from '@/helpers/vndToETH'

interface Props {
  userID: string
  items: Order[]
  total: number
  handlePayment: (
    items: Order[],
    note: string,
    payment: string,
    status: string,
    userID: string,
    total: number
  ) => void
}

const Crypto = ({ userID, items, total, handlePayment }: Props) => {
  const [openErrorDialog, setOpenErrorDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const handleCryptoPayment = async () => {
    try {
      if (!(window as any).ethereum) {
        setErrorMessage('Không tìm thấy ví tiền ảo. Vui lòng cài đặt Metamask!')
        setOpenErrorDialog(true)
      } else {
        await (window as any).ethereum.send('eth_requestAccounts')
        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum
        )
        const signer = provider.getSigner()
        const addr = '0x56a656D41E7CDfcE8eEC3899b5e99EF771f4820e'
        ethers.utils.getAddress(addr)
        const totalEther = await toETH(total)
        //console.log(totalEther)
        await signer
          .sendTransaction({
            to: addr,
            value: ethers.utils.parseEther(`${totalEther}`),
          })
          .then(() =>
            handlePayment(
              items,
              `${totalEther} ETH`,
              'Ethereum',
              'Waiting',
              userID,
              total
            )
          )
      }
    } catch {
      setErrorMessage('Giao dịch đã bị hủy!')
      setOpenErrorDialog(true)
    }
  }
  return (
    <>
      <Button
        onClick={() => handleCryptoPayment()}
        variant="contained"
        startIcon={<MonetizationOnIcon style={{ fontSize: '2rem' }} />}
        style={{
          color: '#FFFFFF',
          backgroundColor: '#215CAF',
          width: '100%',
          height: '3.3rem',
          marginBottom: '1rem',
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
      >
        Thanh toán bằng Ethereum
      </Button>
      <ErrorDialog
        open={openErrorDialog}
        title="Thanh toán không thành công"
        content={errorMessage}
        handleClose={() => setOpenErrorDialog(false)}
      />
    </>
  )
}

export default Crypto
