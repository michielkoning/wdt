export default defineEventHandler(async () => {
  const upcomingActivitiesResponse = async () => await $fetch('/api/upcomingActivities')
  const upcomingShowsResponse = async () => await $fetch('/api/upcomingShows')

  const [upcomingShows, upcomingActivities] = await Promise.all([upcomingActivitiesResponse(), upcomingShowsResponse()])
  const activities = [...upcomingShows, ...upcomingActivities]

  return activities.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})
