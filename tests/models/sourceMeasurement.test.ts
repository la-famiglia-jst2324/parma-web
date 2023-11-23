import { PrismaClient } from '@prisma/client'
import {
  createUser,
  createCompany,
  deleteUser,
  deleteCompany,
  deleteDataSource,
  createDataSource,
  createSourceMeasurement,
  deleteSourceMeasurement
} from './utils/helperFunctions'

const prisma = new PrismaClient()

describe('SourceMeasurement Model Tests', () => {
  let sourceMeasurementId: number
  let dataSourceId: number
  let companyId: number
  let userId: number

  beforeAll(async () => {
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    dataSourceId = (await createDataSource()).id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteCompany(companyId)
    await deleteDataSource(dataSourceId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  // Create SourceMeasurement Test
  test('Create a new SourceMeasurement', async () => {
    const sourceMeasurement = await prisma.sourceMeasurement.create({
      data: {
        sourceModuleId: dataSourceId,
        type: 'MeasurementType', // Replace with your actual type
        companyId,
        measurementName: 'Test Measurement'
      }
    })

    sourceMeasurementId = sourceMeasurement.id

    expect(sourceMeasurement).toHaveProperty('id')
    expect(sourceMeasurement.sourceModuleId).toBe(dataSourceId)
    expect(sourceMeasurement.companyId).toBe(companyId)
    expect(sourceMeasurement.measurementName).toBe('Test Measurement')
  })

  // Read SourceMeasurement Test
  test('Retrieve a SourceMeasurement', async () => {
    const sourceMeasurement = await prisma.sourceMeasurement.findUnique({
      where: { id: sourceMeasurementId }
    })

    expect(sourceMeasurement).toBeTruthy()
    expect(sourceMeasurement.id).toBe(sourceMeasurementId)
    expect(sourceMeasurement.sourceModuleId).toBe(dataSourceId)
    expect(sourceMeasurement.companyId).toBe(companyId)
  })

  // Update SourceMeasurement Test
  test('Update a SourceMeasurement', async () => {
    const updatedSourceMeasurement = await prisma.sourceMeasurement.update({
      where: { id: sourceMeasurementId },
      data: { measurementName: 'Updated Measurement' }
    })

    expect(updatedSourceMeasurement.measurementName).toBe('Updated Measurement')
  })

  // Delete SourceMeasurement Test
  test('Delete a SourceMeasurement', async () => {
    await prisma.sourceMeasurement.delete({
      where: { id: sourceMeasurementId }
    })

    const sourceMeasurement = await prisma.sourceMeasurement.findUnique({
      where: { id: sourceMeasurementId }
    })

    expect(sourceMeasurement).toBeNull()
  })
})

describe('MeasurementTextValue Model Tests', () => {
  let textValueId: number
  let sourceMeasurementId: number
  let companyId: number
  let userId: number
  let dataSourceId: number
  beforeAll(async () => {
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    dataSourceId = (await createDataSource()).id
    sourceMeasurementId = (await createSourceMeasurement(dataSourceId, companyId)).id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteSourceMeasurement(sourceMeasurementId, dataSourceId, companyId)
    await deleteDataSource(dataSourceId)
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  // Create MeasurementTextValue Test
  test('Create a new MeasurementTextValue', async () => {
    const textValue = await prisma.measurementTextValue.create({
      data: {
        sourceMeasurementId,
        value: 'Sample Text'
      }
    })

    textValueId = textValue.id

    expect(textValue).toHaveProperty('id')
    expect(textValue.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(textValue.value).toBe('Sample Text')
  })

  // Read MeasurementTextValue Test
  test('Retrieve a MeasurementTextValue', async () => {
    const textValue = await prisma.measurementTextValue.findUnique({
      where: { id: textValueId }
    })

    expect(textValue).toBeTruthy()
    expect(textValue.id).toBe(textValueId)
    expect(textValue.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(textValue.value).toBe('Sample Text')
  })

  // Update MeasurementTextValue Test
  test('Update a MeasurementTextValue', async () => {
    const updatedTextValue = await prisma.measurementTextValue.update({
      where: { id: textValueId },
      data: { value: 'Updated Text' }
    })

    expect(updatedTextValue.value).toBe('Updated Text')
  })

  // Delete MeasurementTextValue Test
  test('Delete a MeasurementTextValue', async () => {
    await prisma.measurementTextValue.delete({
      where: { id: textValueId }
    })

    const textValue = await prisma.measurementTextValue.findUnique({
      where: { id: textValueId }
    })

    expect(textValue).toBeNull()
  })
})

describe('MeasurementIntValue Model Tests', () => {
  let intValueId: number
  let sourceMeasurementId: number
  let companyId: number
  let userId: number
  let dataSourceId: number
  beforeAll(async () => {
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    dataSourceId = (await createDataSource()).id
    sourceMeasurementId = (await createSourceMeasurement(dataSourceId, companyId)).id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteSourceMeasurement(sourceMeasurementId, dataSourceId, companyId)
    await deleteDataSource(dataSourceId)
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new MeasurementIntValue', async () => {
    const intValue = await prisma.measurementIntValue.create({
      data: {
        sourceMeasurementId,
        value: 68
      }
    })

    intValueId = intValue.id

    expect(intValue).toHaveProperty('id')
    expect(intValue.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(intValue.value).toBe(68)
  })

  test('Retrieve a MeasurementIntValue', async () => {
    const intValue = await prisma.measurementIntValue.findUnique({
      where: { id: intValueId }
    })

    expect(intValue).toBeTruthy()
    expect(intValue.id).toBe(intValueId)
    expect(intValue.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(intValue.value).toBe(68)
  })

  test('Update a MeasurementIntValue', async () => {
    const updatedIntValue = await prisma.measurementIntValue.update({
      where: { id: intValueId },
      data: { value: 70 }
    })

    expect(updatedIntValue.value).toBe(70)
  })

  test('Delete a MeasurementIntValue', async () => {
    await prisma.measurementIntValue.delete({
      where: { id: intValueId }
    })

    const textValue = await prisma.measurementIntValue.findUnique({
      where: { id: intValueId }
    })

    expect(textValue).toBeNull()
  })
})

describe('MeasurementFloatValue Model Tests', () => {
  let floatValueId: number
  let sourceMeasurementId: number
  let companyId: number
  let userId: number
  let dataSourceId: number
  beforeAll(async () => {
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    dataSourceId = (await createDataSource()).id
    sourceMeasurementId = (await createSourceMeasurement(dataSourceId, companyId)).id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteSourceMeasurement(sourceMeasurementId, dataSourceId, companyId)
    await deleteDataSource(dataSourceId)
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new MeasurementFloatValue', async () => {
    const floatValue = await prisma.measurementFloatValue.create({
      data: {
        sourceMeasurementId,
        value: 68.99
      }
    })

    floatValueId = floatValue.id

    expect(floatValue).toHaveProperty('id')
    expect(floatValue.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(floatValue.value).toBe(68.99)
  })

  test('Retrieve a MeasurementFloatValue', async () => {
    const floatValue = await prisma.measurementFloatValue.findUnique({
      where: { id: floatValueId }
    })

    expect(floatValue).toBeTruthy()
    expect(floatValue.id).toBe(floatValueId)
    expect(floatValue.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(floatValue.value).toBe(68.99)
  })

  test('Update a MeasurementFloatValue', async () => {
    const updatedFloatValue = await prisma.measurementFloatValue.update({
      where: { id: floatValueId },
      data: { value: 70.01 }
    })

    expect(updatedFloatValue.value).toBe(70.01)
  })

  test('Delete a MeasurementFloatValue', async () => {
    await prisma.measurementFloatValue.delete({
      where: { id: floatValueId }
    })

    const floatValue = await prisma.measurementFloatValue.findUnique({
      where: { id: floatValueId }
    })

    expect(floatValue).toBeNull()
  })
})

describe('MeasurementCommentValue Model Tests', () => {
  let commentValueId: number
  let sourceMeasurementId: number
  let companyId: number
  let userId: number
  let dataSourceId: number
  beforeAll(async () => {
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    dataSourceId = (await createDataSource()).id
    sourceMeasurementId = (await createSourceMeasurement(dataSourceId, companyId)).id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteSourceMeasurement(sourceMeasurementId, dataSourceId, companyId)
    await deleteDataSource(dataSourceId)
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new MeasurementCommentValue', async () => {
    const commentValue = await prisma.measurementCommentValue.create({
      data: {
        sourceMeasurementId,
        value: 'This is splendid'
      }
    })

    commentValueId = commentValue.id

    expect(commentValue).toHaveProperty('id')
    expect(commentValue.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(commentValue.value).toBe('This is splendid')
  })

  test('Retrieve a MeasurementCommentValue', async () => {
    const commentValue = await prisma.measurementCommentValue.findUnique({
      where: { id: commentValueId }
    })

    expect(commentValue).toBeTruthy()
    expect(commentValue.id).toBe(commentValueId)
    expect(commentValue.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(commentValue.value).toBe('This is splendid')
  })

  test('Update a MeasurementCommentValue', async () => {
    const updatedCommentValue = await prisma.measurementCommentValue.update({
      where: { id: commentValueId },
      data: { value: 'It sucks' }
    })

    expect(updatedCommentValue.value).toBe('It sucks')
  })

  test('Delete a MeasurementCommentValue', async () => {
    await prisma.measurementCommentValue.delete({
      where: { id: commentValueId }
    })

    const deletedCommentValue = await prisma.measurementCommentValue.findUnique({
      where: { id: commentValueId }
    })

    expect(deletedCommentValue).toBeNull()
  })
})

describe('MeasurementParagraphValue Model Tests', () => {
  const paragraph =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec dolor suscipit neque laoreet lacinia at interdum dui. Nulla venenatis dolor vitae orci cursus, et viverra nisi gravida. Vivamus laoreet blandit gravida. Donec consectetur nunc eros, nec lobortis lectus congue at. Duis sed efficitur.'
  let paragraphValueId: number
  let sourceMeasurementId: number
  let companyId: number
  let userId: number
  let dataSourceId: number
  beforeAll(async () => {
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    dataSourceId = (await createDataSource()).id
    sourceMeasurementId = (await createSourceMeasurement(dataSourceId, companyId)).id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteSourceMeasurement(sourceMeasurementId, dataSourceId, companyId)
    await deleteDataSource(dataSourceId)
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new MeasurementParagraphValue', async () => {
    const paragraphValue = await prisma.measurementParagraphValue.create({
      data: {
        sourceMeasurementId,
        value: paragraph
      }
    })

    paragraphValueId = paragraphValue.id

    expect(paragraphValue).toHaveProperty('id')
    expect(paragraphValue.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(paragraphValue.value).toBe(paragraph)
  })

  test('Retrieve a MeasurementParagraphValue', async () => {
    const paragraphValue = await prisma.measurementParagraphValue.findUnique({
      where: { id: paragraphValueId }
    })

    expect(paragraphValue).toBeTruthy()
    expect(paragraphValue.id).toBe(paragraphValueId)
    expect(paragraphValue.sourceMeasurementId).toBe(sourceMeasurementId)
    expect(paragraphValue.value).toBe(paragraph)
  })

  test('Delete a MeasurementParagraphValue', async () => {
    await prisma.measurementParagraphValue.delete({
      where: { id: paragraphValueId }
    })

    const deletedParagraphValue = await prisma.measurementParagraphValue.findUnique({
      where: { id: paragraphValueId }
    })

    expect(deletedParagraphValue).toBeNull()
  })
})
