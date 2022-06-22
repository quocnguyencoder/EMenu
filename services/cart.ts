import firebase from 'firebase/app'
import { Cart } from '@/models/cart'

const getCartInfoByID = async (cartID: string) => {
  const userData = await firebase
    .firestore()
    .collection('cart')
    .doc(cartID)
    .get()
    .then((snapshot) => {
      return snapshot.data() as Cart
    })
  return userData
}

const addItem = async (
  placeID: string,
  itemID: number,
  cartID: string,
  quantity: number
) => {
  const cartInfo = await getCartInfoByID(cartID)
  const cartRef = firebase.firestore().collection('cart').doc(cartID)
  if (placeID !== cartInfo.placeID) {
    cartRef.set({
      placeID: placeID,
      items: { [`${itemID}`]: { quantity: quantity } },
    })
  } else {
    const alreadyInCart = Object.prototype.hasOwnProperty.call(
      cartInfo.items,
      itemID
    )

    alreadyInCart
      ? await cartRef.update({
          [`items.${itemID}.quantity`]:
            cartInfo.items[itemID].quantity + quantity,
        })
      : await cartRef.update({
          [`items.${itemID}.quantity`]: quantity,
        })
  }
}

const clearCart = (cartID: string) => {
  const cartRef = firebase.firestore().collection('cart').doc(cartID)
  cartRef.update({ placeID: '', items: {} })
}

export { getCartInfoByID, addItem, clearCart }
