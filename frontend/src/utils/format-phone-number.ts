export const formatPhoneNumber = (
  value: string
) => {
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{2})(\d)/, '($1) $2')
  value = value.replace(/(\d)(\d{4})$/, '$1-$2')
  if (value.length > 15) return value.slice(0, 14)
  return value
}
