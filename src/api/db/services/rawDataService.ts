const getRawDataForCompany = async (companyId: number) => {
  try {
    const response = await fetch(
      `https://analytics.staging.parma.software/raw-data?companyId=${companyId}` // TODO: update this to use URL from env
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
