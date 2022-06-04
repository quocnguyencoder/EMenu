export interface Details {
  id: string
  intent: string
  status: string
  purchase_units: [
    {
      reference_id: string
      amount: {
        currency_code: string
        value: number
      }
      payee: {
        email_address: string
        merchant_id: string
      }
      shipping: {
        name: {
          full_name: string
        }
        address: {
          address_line_1: string
          admin_area_2: string
          admin_area_1: string
          postal_code: string
          country_code: string
        }
      }
      payments: {
        captures: [
          {
            id: string
            status: string
            status_details: {
              reason: string
            }
            amount: {
              currency_code: string
              value: number
            }
            final_capture: boolean
            seller_protection: {
              status: string
            }
            create_time: string
            update_time: string
          }
        ]
      }
    }
  ]
  payer: {
    name: {
      given_name: string
      surname: string
    }
    email_address: string
    payer_id: string
    address: {
      country_code: string
    }
  }
  create_time: string
  update_time: string
  links: [
    {
      href: string
      rel: string
      method: string
    }
  ]
}
