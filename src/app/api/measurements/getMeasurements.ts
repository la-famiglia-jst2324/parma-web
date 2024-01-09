const getMeasurements = async () => {
  const response = await fetch('/api/measurements', {
    method: 'GET'
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const measurements = await response.json()
  return measurements
}
export default getMeasurements
