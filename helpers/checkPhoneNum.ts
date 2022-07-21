const regexPhoneNumber = (phoneNumber: string) => {
  const regex = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/
  return regex.test(phoneNumber)
}

export { regexPhoneNumber }
