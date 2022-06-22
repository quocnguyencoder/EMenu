const toETH = async (vnd: number) => {
  const rate = await fetch(
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=VND',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${process.env.NEXT_PUBLIC_CRYPTO_COMPARE_API_KEY}`,
      },
    }
  ).then((response) => response.json())
  const eth = vnd / rate.VND

  return eth
}

export { toETH }
