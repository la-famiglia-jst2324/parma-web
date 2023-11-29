import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createUser(name: string = 'Used in Tests') {
  return await prisma.user.create({
    data: {
      name,
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
      isActive: true,
      defaultFrequency: 'DAILY',
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

export async function createSourceMeasurement(dataSourceId: number, companyId: number) {
  return await prisma.sourceMeasurement.create({
    data: {
      sourceModuleId: dataSourceId,
      type: 'Text',
      companyId,
      measurementName: 'Test Measurement'
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
