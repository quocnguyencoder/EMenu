import { Admin } from '@/components/E-Menu'
import { Place } from '@/models/place'
import firebase from 'firebase/app'
import 'firebase/firestore'
import router from 'next/router'
import { useEffect, useState } from 'react'
import * as ROUTES from '@/constants/routes'
import * as getService from '@/firebase/getDocument'
import isEqual from 'lodash/isEqual'

const admin = () => {
  const [placesData, setPlacesData] = useState<Place[]>()
  useEffect(() => {
    const userID = JSON.parse(sessionStorage.getItem('userID') || '{}')
    if (isEqual(userID, {})) {
      router.push(ROUTES.EMenuLogin)
    } else {
      getService.default.verifyAdmin(userID.userID).then((isAdmin) => {
        if (!isAdmin) {
          router.push(ROUTES.HOME)
        } else {
          firebase
            .firestore()
            .collection('place')
            .onSnapshot((snapshot) => {
              const places_data = snapshot.docs.map((doc) => {
                const data = doc.data() as Place
                data.id = doc.id
                return data
              })
              setPlacesData(places_data)
            })
        }
      })
    }
  }, [])
  return placesData !== undefined && <Admin places_data={placesData} />
}

export default admin
