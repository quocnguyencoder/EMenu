import { useEffect, useState } from 'react'
import * as ROUTES from '@/constants/routes'
import CircleCheck from '@/components/common/CircleCheck'

export default function Notify() {
  const [redirectSeconds, setRedirectSeconds] = useState<number>(3)
  // const router = useRouter()

  useEffect(() => {
    const abortController = new AbortController()
    if (redirectSeconds == 0) {
      const a = document.createElement('a')
      a.href = ROUTES.HOME
      a.click()
      return () => {
        /* prevent Can't perform a React state update on an unmounted component. 
        This is a no-op, but it indicates a memory leak in your application */
        abortController.abort()
      }
    }
    setTimeout(() => {
      setRedirectSeconds((redirectSeconds) => redirectSeconds - 1)
    }, 1000)
  }, [redirectSeconds])
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '75vh',
      }}
    >
      <CircleCheck />
      <p
        style={{
          textAlign: 'center',
          margin: '20px 0 60px',
          fontSize: '1.25em',
          color: '#73AF55',
        }}
      >
        Thanh toán thành công...Bạn sẽ trở lại trang Home trong{' '}
        {redirectSeconds} giây
        <br />
        Hoặc nhấn vào <a href={`${ROUTES.HOME}`}>Trở lại ngay lập tức</a>
      </p>
    </div>
  )
}
