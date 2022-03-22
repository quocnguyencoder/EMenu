import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as ROUTES from '@/constants/routes'
import Link from 'next/link'

export default function Notify() {
  const [redirectSeconds, setRedirectSeconds] = useState<number>(3)
  const router = useRouter()

  useEffect(() => {
    if (redirectSeconds == 0) {
      router.push(ROUTES.HOME)
      return
    }

    setTimeout(() => {
      setRedirectSeconds((redirectSeconds) => redirectSeconds - 1)
    }, 1000)
  }, [redirectSeconds])
  return (
    <>
      Thanh toán thành công...Bạn sẽ trở lại trang Home trong {redirectSeconds}{' '}
      giây
      <br />
      Hoặc nhấn vào <Link href={`${ROUTES.HOME}`}>Trở lại ngay lập tức</Link>
    </>
  )
}
