const shortcutAddress = (input: string) => {
  input = input.replace(/^(?:Thành phố)/, 'TP.')
  input = input.replace(/^(?:Phường)/, 'P.')
  input = input.replace(/ +(?= )/g, '').trim()
  return input
}
export default shortcutAddress
