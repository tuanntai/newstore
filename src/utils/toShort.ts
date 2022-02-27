const toShort = (input: string, numberOfFirstPart: number, numberOfLastPart: number): string =>
  `${input.substring(0, numberOfFirstPart)}...${input.substring(
    input.length - numberOfLastPart,
    input.length
  )}`

export { toShort }

export const formatPrice = (num: number) => {
  var n = Number(num)
  return n.toLocaleString('en')
}
