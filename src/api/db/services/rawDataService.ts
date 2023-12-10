const getRawDataForCompany = async (companyId: number) => {
  try {
    const response = await fetch(
      `https://github.com/la-famiglia-jst2324/parma-analytics/raw-data?companyId=${companyId}`
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error retrieving data:', error)
    throw new Error('Unable to retrieve data')
  }
}

export { getRawDataForCompany }
