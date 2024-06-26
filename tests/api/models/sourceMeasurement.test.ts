import { PrismaClient } from '@prisma/client'
import {
  createUser,
  createCompany,
  deleteUser,
  deleteCompany,
  deleteDataSource,
  createDataSource,
  createSourceMeasurement,
  deleteSourceMeasurement,
  createCompanySourceMeasurement
} from './utils/helperFunctions'
import { deleteCompanySourceMeasurement } from '@/api/db/services/companySourceMeasurementService'

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
        measurementName: 'Test Measurement'
      }
    })

    sourceMeasurementId = sourceMeasurement.id

    expect(sourceMeasurement).toHaveProperty('id')
    expect(sourceMeasurement.sourceModuleId).toBe(dataSourceId)
    expect(sourceMeasurement.measurementName).toBe('Test Measurement')
  })

  // Read SourceMeasurement Test
  test('Retrieve a SourceMeasurement', async () => {
    const sourceMeasurement = await prisma.sourceMeasurement.findUnique({
      where: { id: sourceMeasurementId }
    })

    expect(sourceMeasurement).toBeTruthy()
    expect(sourceMeasurement?.id).toBe(sourceMeasurementId)
    expect(sourceMeasurement?.sourceModuleId).toBe(dataSourceId)
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

describe('CompanySourceMeasurement Model Tests', () => {
  let sourceMeasurementId: number
  let companySourceMeasurementId: number
  let dataSourceId: number
  let companyId: number
  let userId: number

  beforeAll(async () => {
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    dataSourceId = (await createDataSource()).id
    sourceMeasurementId = (await createSourceMeasurement(dataSourceId)).id
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteSourceMeasurement(sourceMeasurementId)
    await deleteCompany(companyId)
    await deleteDataSource(dataSourceId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  // Create CompanySourceMeasurement Test
  test('Create a new CompanySourceMeasurement', async () => {
    const companySourceMeasurement = await prisma.companySourceMeasurement.create({
      data: {
        sourceMeasurementId,
        companyId
      }
    })

    companySourceMeasurementId = companySourceMeasurement.companyMeasurementId

    expect(companySourceMeasurement).toHaveProperty('companyMeasurementId')
    expect(companySourceMeasurement.companyId).toBe(companyId)
  })

  // Read CompanySourceMeasurement Test
  test('Retrieve a CompanySourceMeasurement', async () => {
    const companySourceMeasurement = await prisma.companySourceMeasurement.findUnique({
      where: { companyMeasurementId: companySourceMeasurementId }
    })

    expect(companySourceMeasurement).toBeTruthy()
    expect(companySourceMeasurement?.companyMeasurementId).toBe(companySourceMeasurementId)
    expect(companySourceMeasurement?.companyId).toBe(companyId)
    expect(companySourceMeasurement?.sourceMeasurementId).toBe(sourceMeasurementId)
  })

  // Update CompanySourceMeasurement Test
  test('Update a CompanySourceMeasurement', async () => {
    const updatedCompanyMeasurement = await prisma.companySourceMeasurement.update({
      where: { companyMeasurementId: companySourceMeasurementId },
      data: { sourceMeasurementId }
    })

    expect(updatedCompanyMeasurement.sourceMeasurementId).toBe(sourceMeasurementId)
  })

  // Delete CompanySourceMeasurement Test
  test('Delete a CompanySourceMeasurement', async () => {
    await prisma.companySourceMeasurement.delete({
      where: { companyMeasurementId: companySourceMeasurementId }
    })

    const companySourceMeasurement = await prisma.companySourceMeasurement.findUnique({
      where: { companyMeasurementId: companySourceMeasurementId }
    })

    expect(companySourceMeasurement).toBeNull()
  })
})

describe('MeasurementTextValue Model Tests', () => {
  let textValueId: number
  let sourceMeasurementId: number
  let companySourceMeasurementId: number
  let companyId: number
  let userId: number
  let dataSourceId: number
  beforeAll(async () => {
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    dataSourceId = (await createDataSource()).id
    sourceMeasurementId = (await createSourceMeasurement(dataSourceId)).id
    companySourceMeasurementId = (await createCompanySourceMeasurement(sourceMeasurementId, companyId))
      .companyMeasurementId
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteSourceMeasurement(sourceMeasurementId)
    await deleteDataSource(dataSourceId)
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  // Create MeasurementTextValue Test
  test('Create a new MeasurementTextValue', async () => {
    const textValue = await prisma.measurementTextValue.create({
      data: {
        companyMeasurementId: companySourceMeasurementId,
        value: 'Sample Text',
        timestamp: new Date()
      }
    })

    textValueId = textValue.id

    expect(textValue).toHaveProperty('id')
    expect(textValue.companyMeasurementId).toBe(companySourceMeasurementId)
    expect(textValue.value).toBe('Sample Text')
  })

  // Read MeasurementTextValue Test
  test('Retrieve a MeasurementTextValue', async () => {
    const textValue = await prisma.measurementTextValue.findUnique({
      where: { id: textValueId }
    })

    expect(textValue).toBeTruthy()
    expect(textValue?.id).toBe(textValueId)
    expect(textValue?.companyMeasurementId).toBe(companySourceMeasurementId)
    expect(textValue?.value).toBe('Sample Text')
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
  let companySourceMeasurementId: number
  let companyId: number
  let userId: number
  let dataSourceId: number
  beforeAll(async () => {
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    dataSourceId = (await createDataSource()).id
    sourceMeasurementId = (await createSourceMeasurement(dataSourceId)).id
    companySourceMeasurementId = (await createCompanySourceMeasurement(sourceMeasurementId, companyId))
      .companyMeasurementId
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteCompanySourceMeasurement(companySourceMeasurementId)
    await deleteSourceMeasurement(sourceMeasurementId)
    await deleteDataSource(dataSourceId)
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new MeasurementIntValue', async () => {
    const intValue = await prisma.measurementIntValue.create({
      data: {
        companyMeasurementId: companySourceMeasurementId,
        value: 68,
        timestamp: new Date()
      }
    })

    intValueId = intValue.id

    expect(intValue).toHaveProperty('id')
    expect(intValue.companyMeasurementId).toBe(companySourceMeasurementId)
    expect(intValue.value).toBe(68)
  })

  test('Retrieve a MeasurementIntValue', async () => {
    const intValue = await prisma.measurementIntValue.findUnique({
      where: { id: intValueId }
    })

    expect(intValue).toBeTruthy()
    expect(intValue?.id).toBe(intValueId)
    expect(intValue?.companyMeasurementId).toBe(companySourceMeasurementId)
    expect(intValue?.value).toBe(68)
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
  let companySourceMeasurementId: number
  let companyId: number
  let userId: number
  let dataSourceId: number
  beforeAll(async () => {
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    dataSourceId = (await createDataSource()).id
    sourceMeasurementId = (await createSourceMeasurement(dataSourceId)).id
    companySourceMeasurementId = (await createCompanySourceMeasurement(sourceMeasurementId, companyId))
      .companyMeasurementId
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteCompanySourceMeasurement(companySourceMeasurementId)
    await deleteSourceMeasurement(sourceMeasurementId)
    await deleteDataSource(dataSourceId)
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new MeasurementFloatValue', async () => {
    const floatValue = await prisma.measurementFloatValue.create({
      data: {
        companyMeasurementId: companySourceMeasurementId,
        value: 68.99,
        timestamp: new Date()
      }
    })

    floatValueId = floatValue.id

    expect(floatValue).toHaveProperty('id')
    expect(floatValue.companyMeasurementId).toBe(companySourceMeasurementId)
    expect(floatValue.value).toBe(68.99)
  })

  test('Retrieve a MeasurementFloatValue', async () => {
    const floatValue = await prisma.measurementFloatValue.findUnique({
      where: { id: floatValueId }
    })

    expect(floatValue).toBeTruthy()
    expect(floatValue?.id).toBe(floatValueId)
    expect(floatValue?.companyMeasurementId).toBe(companySourceMeasurementId)
    expect(floatValue?.value).toBe(68.99)
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
  let companySourceMeasurementId: number
  let companyId: number
  let userId: number
  let dataSourceId: number
  beforeAll(async () => {
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    dataSourceId = (await createDataSource()).id
    sourceMeasurementId = (await createSourceMeasurement(dataSourceId)).id
    companySourceMeasurementId = (await createCompanySourceMeasurement(sourceMeasurementId, companyId))
      .companyMeasurementId
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteCompanySourceMeasurement(companySourceMeasurementId)
    await deleteSourceMeasurement(sourceMeasurementId)
    await deleteDataSource(dataSourceId)
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new MeasurementCommentValue', async () => {
    const commentValue = await prisma.measurementCommentValue.create({
      data: {
        companyMeasurementId: companySourceMeasurementId,
        value: 'This is splendid',
        timestamp: new Date(),
        sentimentScore: 5
      }
    })

    commentValueId = commentValue.id

    expect(commentValue).toHaveProperty('id')
    expect(commentValue.companyMeasurementId).toBe(companySourceMeasurementId)
    expect(commentValue.value).toBe('This is splendid')
    expect(commentValue.sentimentScore).toBe(5)
  })

  test('Retrieve a MeasurementCommentValue', async () => {
    const commentValue = await prisma.measurementCommentValue.findUnique({
      where: { id: commentValueId }
    })

    expect(commentValue).toBeTruthy()
    expect(commentValue?.id).toBe(commentValueId)
    expect(commentValue?.companyMeasurementId).toBe(companySourceMeasurementId)
    expect(commentValue?.value).toBe('This is splendid')
    expect(commentValue?.sentimentScore).toBe(5)
  })

  test('Update a MeasurementCommentValue', async () => {
    const updatedCommentValue = await prisma.measurementCommentValue.update({
      where: { id: commentValueId },
      data: {
        value: 'It sucks',
        sentimentScore: 10
      }
    })

    expect(updatedCommentValue.value).toBe('It sucks')
    expect(updatedCommentValue.sentimentScore).toBe(10)
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
  let companySourceMeasurementId: number
  let companyId: number
  let userId: number
  let dataSourceId: number
  beforeAll(async () => {
    userId = (await createUser()).id
    companyId = (await createCompany(userId)).id
    dataSourceId = (await createDataSource()).id
    sourceMeasurementId = (await createSourceMeasurement(dataSourceId)).id
    companySourceMeasurementId = (await createCompanySourceMeasurement(sourceMeasurementId, companyId))
      .companyMeasurementId
    await prisma.$connect()
  })

  afterAll(async () => {
    await deleteCompanySourceMeasurement(companySourceMeasurementId)
    await deleteSourceMeasurement(sourceMeasurementId)
    await deleteDataSource(dataSourceId)
    await deleteCompany(companyId)
    await deleteUser(userId)
    await prisma.$disconnect()
  })

  test('Create a new MeasurementParagraphValue', async () => {
    const paragraphValue = await prisma.measurementParagraphValue.create({
      data: {
        companyMeasurementId: companySourceMeasurementId,
        value: paragraph,
        timestamp: new Date()
      }
    })

    paragraphValueId = paragraphValue.id

    expect(paragraphValue).toHaveProperty('id')
    expect(paragraphValue.companyMeasurementId).toBe(companySourceMeasurementId)
    expect(paragraphValue.value).toBe(paragraph)
  })

  test('Retrieve a MeasurementParagraphValue', async () => {
    const paragraphValue = await prisma.measurementParagraphValue.findUnique({
      where: { id: paragraphValueId }
    })

    expect(paragraphValue).toBeTruthy()
    expect(paragraphValue?.id).toBe(paragraphValueId)
    expect(paragraphValue?.companyMeasurementId).toBe(companySourceMeasurementId)
    expect(paragraphValue?.value).toBe(paragraph)
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
