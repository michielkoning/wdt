export default defineI18nConfig(() => ({
  legacy: false,
  datetimeFormats: {
    nl: {
      short: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
      day: {
        weekday: 'short',
      },
    },
  },
}))
