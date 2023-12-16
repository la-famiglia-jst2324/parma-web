import { DataSourceType, PrismaClient } from '@prisma/client'
import { genRandomDummyAuthId } from '@tests/api/utils/random'

const prisma = new PrismaClient()

export async function createUser(name: string = 'Used in Tests') {
  return await prisma.user.create({
    data: {
      name,
      authId: genRandomDummyAuthId(),
      role: 'USER'
    }
  })
}

export async function createCompany(userId: number) {
  return await prisma.company.create({
    data: {
      name: 'User in Tests',
      addedBy: userId
    }
  })
}

export async function createBucket(userId: number) {
  return await prisma.bucket.create({
    data: {
      title: 'test bucket',
      ownerId: userId
    }
  })
}

export async function createDataSource() {
  return await prisma.dataSource.create({
    data: {
      sourceName: 'Test Source',
      sourceType: DataSourceType.GITHUB,
      isActive: true,
      frequency: 'DAILY',
      healthStatus: 'UP',
      description: 'Test Description'
    }
  })
}
export async function deleteUser(userId: number) {
  await prisma.user.delete({
    where: { id: userId }
  })
}

export async function deleteCompany(companyId: number) {
  await prisma.company.delete({
    where: { id: companyId }
  })
}

export async function deleteBucket(bucketId: number) {
  await prisma.bucket.delete({
    where: { id: bucketId }
  })
}

export async function deleteDataSource(dataSourceId: number) {
  return await prisma.dataSource.delete({
    where: {
      id: dataSourceId
    }
  })
}

export async function createSourceMeasurement(dataSourceId: number) {
  return await prisma.sourceMeasurement.create({
    data: {
      sourceModuleId: dataSourceId,
      type: 'Text',
      measurementName: 'Test Measurement'
    }
  })
}

export async function createCompanySourceMeasurement(sourceMeasurementId: number, companyId: number) {
  return await prisma.companySourceMeasurement.create({
    data: {
      sourceMeasurementId,
      companyId
    }
  })
}

export async function deleteSourceMeasurement(measurementValueId: number) {
  return await prisma.sourceMeasurement.delete({
    where: {
      id: measurementValueId
    }
  })
}
