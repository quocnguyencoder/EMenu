import firebase from 'firebase/app'
import 'firebase/firestore'
// import useUser from '../../firebase/useUser'

const WriteToCloudFirestore = () => {
  // const { user } = useUser()
  const sendData = () => {
    try {
      firebase
        .firestore()
        .collection('place')
        .doc() // leave as .doc() for a random unique doc name to be assigned
        .set({
          name: 'Cơm Tấm Sườn Que - Yết Kiêu',
          type: 'Quán ăn',
          address: {
            street: '3 Yết Kiêu',
            ward: 'Vạn Thắng',
            city: 'Nha Trang',
            province: 'Khánh Hòa',
          },
          rating: 4,
          time: {
            open: '08:00 AM',
            close: '08:00 PM',
          },
          image:
            'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/place_pictures%2FRl2KBm5pkobdVhYEBEJU%2Fmain%20pic.jpeg?alt=media&token=f21a70b5-ee5c-4d69-9f34-c51fabfd1f90',
          category: ['Món đang giảm', 'Combo', 'Cơm', 'Gọi thêm'],
          menu: [
            {
              name: 'Cơm tấm sườn miếng sốt Maki mật ong',
              category: [0, 2],
              description: 'Sườn ướp đượm vị cùng sốt siêu ngon',
              image:
                'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/place_pictures%2FRl2KBm5pkobdVhYEBEJU%2F1.jpeg?alt=media&token=a1c3c888-686d-4d1a-8cc7-b32274c9e014',
              price: 38000,
            },
            {
              name: 'Combo ăn ngon',
              category: [1],
              description:
                '1 Cơm sườn que sốt Maki + 1 Cơm sườn que Maki + ốp la',
              image:
                'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/place_pictures%2FRl2KBm5pkobdVhYEBEJU%2F2.jpeg?alt=media&token=2bc112bc-6499-4080-a99a-7ed0b61529d8',
              price: 85000,
            },
          ],
          location: {
            lat: 10.1023,
            lng: 105.2344237,
          },
          review: [],
          show: true,
        })
        .then(() => alert('Data was successfully sent to cloud firestore!'))
    } catch (error) {
      //console.log(error);
      alert(error)
    }
  }

  return (
    <div style={{ margin: '5px 0' }}>
      <button onClick={sendData} style={{ width: '100%' }}>
        Send Data To Cloud Firestore
      </button>
    </div>
  )
}

export default WriteToCloudFirestore
