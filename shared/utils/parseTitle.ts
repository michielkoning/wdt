export const parseTitle = (title: string) => {
  return title.replaceAll('&#038;', '&').replaceAll('&#8211;', '–')
}
