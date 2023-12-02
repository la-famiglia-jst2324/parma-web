import type { ZodError } from 'zod'

/**
 * Formats Zod error messages to include the field name and the custom message.
 * @param {ZodError} error - The Zod error object.
 * @returns {Array<{ field: string; message: string }>} - An array of formatted error messages.
 */
function formatZodErrors(error: ZodError) {
  return error.issues.map((issue) => {
    // Assuming the error is at the top level of the schema
    const field = issue.path.length > 0 ? issue.path[0] : 'unknown'
    const message = issue.message

    return { field, message }
  })
}

export default formatZodErrors
