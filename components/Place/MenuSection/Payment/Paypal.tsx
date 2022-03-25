import { Order } from '@/models/place'
import { PayPalButton } from 'react-paypal-button-v2'
import { Details } from '@/models/paypal'
import Script from 'next/script'

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

export const Paypal = ({ userID, items, total, handlePayment }: Props) => {
  return (
    <>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`}
        strategy="beforeInteractive"
      />
      <PayPalButton
        amount={(total / 22865).toFixed(2)}
        onSuccess={(details: Details) => {
          const fee =
            (details.purchase_units[0].amount.value * 3.49) / 100 + 0.49
          handlePayment(
            items,
            `Phí dịch vụ Paypal ${details.purchase_units[0].amount.value} x 3,49% + 0,49 = ${fee} USD`,
            `Paypal`,
            details.status,
            userID,
            (details.purchase_units[0].amount.value - fee) * 22865
          )
        }}
      />
    </>
  )
}

export default Paypal
