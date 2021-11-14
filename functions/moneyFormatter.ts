const formatter = new Intl.NumberFormat('vi-VI', {
  style: 'currency',
  currency: 'VND',
})
const moneyFormatter = new Intl.NumberFormat('vi-VI', {
  style: 'currency',
  currency: 'VND',
})

export default { formatter, moneyFormatter }
