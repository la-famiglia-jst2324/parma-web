type AnalyticsDataItem = {
  date: string
  [key: string]: number | string
}
const extractCategories = (data: AnalyticsDataItem[]): string[] => {
  const categorySet = new Set<string>()

  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key !== 'date') {
        categorySet.add(key)
      }
    })
  })

  return Array.from(categorySet)
}
export default extractCategories
