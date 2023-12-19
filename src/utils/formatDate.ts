function formatDate(date: Date | null) {
  return date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    : 'No date'
}
export default formatDate
