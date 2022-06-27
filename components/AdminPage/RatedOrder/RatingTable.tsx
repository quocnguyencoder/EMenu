import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridCellParams,
} from '@material-ui/data-grid'
import Chip, { ChipProps } from '@material-ui/core/Chip'
import { blue, green, red, orange } from '@material-ui/core/colors'
import moment from 'moment'
import { BillDetail } from '@/models/place'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import WarningIcon from '@material-ui/icons/Warning'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { useState } from 'react'
import ModalRatedOrder from './ModalRatedOrder'

interface Props {
  orderList: BillDetail[]
}

const RatingTable = ({ orderList }: Props) => {
  const [pageSize, setPageSize] = useState<number>(5)
  const [infoModal, setInfoModal] = useState({
    open: false,
    orderDetail: {} as BillDetail,
  })
  const handleCloseModal = () => {
    setInfoModal({
      open: false,
      orderDetail: {} as BillDetail,
    })
  }

  function getChipProps(params: GridCellParams): ChipProps {
    if (params.row.feedback.rating == 0) {
      return {
        icon: <AutorenewIcon style={{ fill: blue[500] }} />,
        label: `Chưa được đánh giá`,
        style: {
          borderColor: blue[500],
          color: blue[500],
        },
      }
    } else if (
      params.row.feedback.rating == 1 ||
      params.row.feedback.rating == 2
    ) {
      return {
        icon: <WarningIcon style={{ fill: red[500] }} />,
        label: `1-2*`,
        style: {
          borderColor: red[500],
          color: red[500],
        },
      }
    } else if (params.row.feedback.rating == 3) {
      return {
        icon: <CheckCircleIcon style={{ fill: orange[500] }} />,
        label: `3*`,
        style: {
          borderColor: orange[500],
          color: orange[500],
        },
      }
    } else {
      return {
        icon: <CheckCircleIcon style={{ fill: green[500] }} />,
        label: `4-5*`,
        style: {
          borderColor: green[500],
          color: green[500],
        },
      }
    }
  }
  const columns: GridColDef[] = [
    {
      field: `buyerName`,
      headerName: `Người đặt hàng`,
      headerAlign: 'center',
      flex: 1.2,
    },
    { field: `payment`, headerName: `Phương thức thanh toán`, flex: 1.25 },
    {
      field: `deliveryTo`,
      headerName: `Địa chỉ`,
      headerAlign: 'center',
      flex: 1.3,
    },
    {
      field: `phone`,
      headerName: `Số điện thoại`,
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: `datetime`,
      headerName: `Thời gian đặt hàng`,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `${moment(params.row.datetime).format('hh:mm A')}`,
    },
    {
      field: `rating`,
      headerName: `Đánh giá`,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.feedback.rating,
      renderCell: (params) => {
        const handleOpenModal = () => {
          setInfoModal({
            open: true,
            orderDetail: params.row as BillDetail,
          })
        }
        return (
          <Chip
            onClick={handleOpenModal}
            variant="outlined"
            size="small"
            {...getChipProps(params)}
          />
        )
      },
    },
  ]
  return (
    <>
      <div style={{ height: '75vh', width: '100%', paddingRight: '1%' }}>
        <DataGrid
          rows={orderList}
          columns={columns}
          getRowId={(row) => row.billID}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pagination
          //checkboxSelection
          disableSelectionOnClick
        />
      </div>
      {infoModal.open && (
        <ModalRatedOrder
          infoModal={infoModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  )
}

export default RatingTable
