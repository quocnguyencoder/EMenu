const moneyFormatter = new Intl.NumberFormat('vi-VI', {
  style: 'currency',
  currency: 'VND',
})

export default moneyFormatter
