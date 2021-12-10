import firebase from 'firebase/app'
import 'firebase/firestore'
import { GetStaticProps } from 'next'
import { Place } from '@/models/place'
import { Box, Snackbar } from '@material-ui/core'
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridCellParams,
} from '@material-ui/data-grid'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'
import DeleteIcon from '@material-ui/icons/Delete'
import Chip, { ChipProps } from '@material-ui/core/Chip'
import { blue, orange, green, red } from '@material-ui/core/colors'
import * as updateService from '@/firebase/updateDocument'
import { useState } from 'react'
import { DeletePlace } from '@/components/E-Menu/'
import { SnackbarOrigin } from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import type { Color } from '@material-ui/lab/Alert'

interface State extends SnackbarOrigin {
  open: boolean
}

interface Props {
  places_data: Place[]
}

const admin = ({ places_data }: Props) => {
  function getChipProps(params: GridCellParams): ChipProps {
    if (!params.row.show) {
      return {
        icon: <AutorenewIcon style={{ fill: orange[500] }} />,
        label: `Đang chờ xác thực`,
        style: {
          borderColor: orange[500],
          color: orange[500],
        },
      }
    } else {
      return {
        icon: <CheckCircleIcon style={{ fill: green[500] }} />,
        label: `Đã xác thực`,
        style: {
          borderColor: green[500],
          color: green[500],
        },
      }
    }
  }
  const columns: GridColDef[] = [
    {
      field: `name`,
      headerName: `Tên địa điểm`,
      flex: 2,
    },
    {
      field: `Address`,
      headerName: `Địa chỉ`,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.address.street}, ${params.row.address.ward}, ${params.row.address.city}, ${params.row.address.province},`,
      flex: 2,
    },
    {
      field: `phone`,
      headerName: `Số điện thoại`,
      flex: 1,
    },
    {
      field: `type`,
      headerName: `Loại hình kinh doanh`,
      flex: 1,
    },
    {
      field: `show`,
      headerName: `Xác thực`,
      type: `boolean`,
      flex: 1,
      renderCell: (params) => {
        return (
          <Chip variant="outlined" size="small" {...getChipProps(params)} />
        )
      },
    },
    {
      field: 'action',
      headerName: 'Hành động',
      sortable: false,
      flex: 2,
      renderCell: (params) => {
        const handleDeletePlace = () => {
          setOpenModal(true)
          setPlaceInfo({
            id: params.row.id as string,
            name: params.row.name as string,
          })
        }

        const handleVerifyPlace = (verify: boolean) => {
          updateService.default.verifyPlace(params.row.id as string, verify)
          const index = placesData.findIndex(
            (placeData) => placeData.id === (params.row.id as string)
          )
          const newPlacesData: Place[] = [
            ...placesData.slice(0, index),
            { ...placesData[index], show: verify },
            ...placesData.slice(index + 1),
          ]
          setPlaceInfo({
            id: params.row.id as string,
            name: params.row.name as string,
          })
          verify
            ? handleOpenAlert(`Xác nhận địa điểm`, `success`)
            : handleOpenAlert(`Đã hủy xác nhận địa điểm`, `info`)
          setPlacesData(newPlacesData)
        }
        return (
          <Box display="flex" style={{ gap: '2%' }}>
            <Chip
              variant="outlined"
              onClick={handleDeletePlace}
              size="small"
              icon={<DeleteIcon style={{ fill: red[500] }} />}
              label={`Xóa địa điểm`}
              style={{
                borderColor: red[500],
                color: red[500],
              }}
            />
            {params.row.show ? (
              <Chip
                variant="outlined"
                onClick={() => handleVerifyPlace(false)}
                size="small"
                icon={<WarningIcon style={{ fill: blue[500] }} />}
                label={`Hủy xác nhận địa điểm`}
                style={{
                  borderColor: blue[500],
                  color: blue[500],
                }}
              />
            ) : (
              <Chip
                variant="outlined"
                onClick={() => handleVerifyPlace(true)}
                size="small"
                icon={<CheckCircleIcon style={{ fill: green[500] }} />}
                label={`Xác nhận địa điểm`}
                style={{
                  borderColor: green[500],
                  color: green[500],
                }}
              />
            )}
          </Box>
        )
      },
    },
  ]
  const [placesData, setPlacesData] = useState<Place[]>(places_data)
  const [placeInfo, setPlaceInfo] = useState({ id: '', name: '' })
  const [openModal, setOpenModal] = useState(false)

  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })
  const { vertical, horizontal, open } = state
  const [message, setMessage] = useState({
    text: '',
    severity: 'error' as Color,
  })
  const handleOpenAlert = (text: string, severity: Color) => {
    setState({ ...state, open: true })
    setMessage({
      text: text,
      severity: severity,
    })
  }
  const handleCloseAlert = () => {
    setState({ ...state, open: false })
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <div style={{ height: '75vh', width: '100%' }}>
        <DataGrid
          rows={placesData}
          columns={columns}
          pageSize={5}
          //checkboxSelection
          disableSelectionOnClick
        />
      </div>
      {openModal && (
        <DeletePlace
          placesData={placesData}
          placeInfo={placeInfo}
          openModal={openModal}
          setPlacesData={setPlacesData}
          handleCloseModal={handleCloseModal}
        />
      )}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={2000}
        open={open}
        key={vertical + horizontal}
        onClose={handleCloseAlert}
      >
        <Alert variant="filled" severity={message.severity}>
          {message.text} <b style={{ color: '#FF99FF' }}>{placeInfo.name}</b>
        </Alert>
      </Snackbar>
    </>
  )
}

export default admin

export const getStaticProps: GetStaticProps = async () => {
  const querySnapshot = await firebase.firestore().collection('place').get()

  const places_data = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Place
    data.id = doc.id
    return data
  })

  return {
    props: { places_data },
    revalidate: 600,
  }
}
