export default defineI18nConfig(() => ({
  legacy: false,
  datetimeFormats: {
    nl: {
      short: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        weekday: 'long',
        minute: '2-digit',
      },
      day: {
        weekday: 'short',
      },
    },
  },
}))
