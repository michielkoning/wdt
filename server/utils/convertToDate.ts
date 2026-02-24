export const convertToDate = (value: string) => {
  const date = value.split('/')
  if (date.length === 3) {
    return new Date(Number(date[2]), Number(date[1]) - 1, Number(date[0]))
  }
  return undefined
}
