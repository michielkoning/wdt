export const fetchData = async (url: string) => {
  return await $fetch(url, {
    // headers: {
    //   Authorization: `Basic ${key}`,
    // },
  }).catch(err => console.log(err))
}
