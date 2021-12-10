const restoreAddress = (input: string) => {
  input = input.replace(/^(?:TP.)/, 'Thành phố')
  input = input.replace(/^(?:P.)/, 'Phường')
  input = input.replace(/ +(?= )/g, '').trim()
  return input
}
export default restoreAddress
