export const paginate = async (model: any, page: number, pageSize: number, whereCondition = {}) => {
  try {
    const skip = (page - 1) * pageSize
    const items = await model.findMany({
      skip,
      take: pageSize,
      where: whereCondition
    })

    const totalCount = await model.count({ where: whereCondition })
    const totalPages = Math.ceil(totalCount / pageSize)

    if (items && totalCount) {
      return {
        items,
        pagination: {
          currentPage: page,
          pageSize,
          totalPages,
          totalCount
        }
      }
    } else throw new Error(`Error fetching data}`)
  } catch (error) {
    console.error('Error fetching paginated data:', error)
    throw error
  }
}
