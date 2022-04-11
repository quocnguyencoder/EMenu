import { Place, BillDetail } from '@/models/place'
import { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridCellParams,
} from '@material-ui/data-grid'
import * as getService from '@/firebase/getDocument'
import moneyFormatter from '@/functions/moneyFormatter'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import Chip, { ChipProps } from '@material-ui/core/Chip'
import { blue, green } from '@material-ui/core/colors'
// import CheckCircleIcon from '@material-ui/icons/CheckCircle'
// import * as updateService from '@/firebase/updateDocument'
import moment from 'moment'
import ModalBillDetail from './ModalBillDetail'

interface Props {
  place: Place
}

const OrderManagement: React.FC<Props> = ({ place }: Props) => {
  function getChipProps(params: GridCellParams): ChipProps {
    const color = () =>
      params.row.status == 'Waiting' ? blue[500] : green[500]
    return {
      icon: (
        <AutorenewIcon
          style={{
            fill: color(),
          }}
        />
      ),
      label: `Chờ xác nhận`,
      style: {
        borderColor: color(),
        color: color(),
      },
    }
  }
  const [orders, setOrders] = useState<BillDetail[]>()
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
  const columns: GridColDef[] = [
    // {
    //   field: `billID`,
    //   headerName: `Đơn đặt hàng`,
    //   flex: 1,
    // },
    {
      field: `buyerName`,
      headerName: `Người đặt hàng`,
      headerAlign: 'center',
      flex: 1.2,
    },
    { field: `payment`, headerName: `Phương thức thanh toán`, flex: 1.45 },
    { field: `note`, headerName: `Lưu ý`, headerAlign: 'center', flex: 1 },
    {
      field: `datetime`,
      headerName: `Ngày đặt hàng`,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `${moment(params.row.datetime).format('DD-MM-YYYY hh:mm A')}`,
    },
    {
      field: `status`,
      headerName: `Tình trạng`,
      flex: 1,
      renderCell: (params) => {
        const handleOpenModal = () => {
          setInfoModal({
            open: true,
            orderDetail: params.row as BillDetail,
          })
        }
        // const handleConfirm = () => {
        //   updateService.default.verifyOrder(params.row.billID, 'Confirmed')
        // }

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
    {
      field: `total`,
      headerName: `Tổng`,
      valueGetter: (params: GridValueGetterParams) =>
        `${moneyFormatter.format(params.row.total)}`,
      flex: 0.75,
    },
  ]
  useEffect(() => {
    firebase
      .firestore()
      .collection('bill')
      .onSnapshot((snapshot) => {
        const orders_data = snapshot.docs.map(async (doc) => {
          const order = doc.data() as BillDetail
          order.billID = doc.id
          order.buyerName = await getService.default
            .getUserInfo(order.userID)
            .then((user) => user.name)
          return order
        })
        Promise.all(orders_data).then((billDetailList) => {
          setOrders(
            billDetailList.filter(
              (billDetail) =>
                billDetail.placeID == place.id &&
                billDetail.status !== 'Confirmed'
            )
          )
        })
      })
  }, [])

  return orders !== undefined ? (
    <>
      <div style={{ height: '75vh', width: '100%' }}>
        <DataGrid
          rows={orders}
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
        <ModalBillDetail
          placeID={place.id}
          infoModal={infoModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  ) : (
    <></>
  )
}

export default OrderManagement
