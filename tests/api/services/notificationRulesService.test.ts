import { Frequency, HealthStatus, PrismaClient } from '@prisma/client'
import { createDataSource, deleteDataSource } from '@/api/db/services/dataSourceService'
import { createSourceMeasurement, deleteSourceMeasurement } from '@/api/db/services/sourceMeasurementService'

import {
  createNotificationRule,
  getNotificationRuleById,
  updateNotificationRule,
  deleteNotificationRule
} from '@/api/db/services/notificationRulesService'
const prisma = new PrismaClient()

describe('Notification Rule Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    deleteSourceMeasurement(measurementId)
    deleteDataSource(dataSourceId)
    await prisma.$disconnect()
  })

  let dataSourceId: number
  let measurementId: number
  let ruleId: number
  test('Create a new data source with valid details', async () => {
    const dataSource = await createDataSource({
      sourceName: 'source1',
      isActive: true,
      frequency: Frequency.DAILY,
      healthStatus: HealthStatus.UP,
      description: 'a new data source',
      invocationEndpoint: 'dummy endpoint'
    })
    expect(dataSource).toHaveProperty('id')
    dataSourceId = dataSource.id
  })

  test('Create a new source measurement with valid details', async () => {
    const measurement = await createSourceMeasurement({
      sourceModuleId: dataSourceId,
      type: 'int',
      measurementName: '# of followers'
    })
    expect(measurement).toHaveProperty('id')
    measurementId = measurement.id
  })

  test('Create a new rule with valid details', async () => {
    const rule = await createNotificationRule({
      ruleName: 'rule1',
      sourceMeasurementId: measurementId,
      threshold: 1.2
    })
    expect(rule).toHaveProperty('ruleId')
    ruleId = rule.ruleId
  })

  test('Retrieve a rule by ID', async () => {
    const rule = await getNotificationRuleById(ruleId)
    expect(rule).toBeTruthy()
    expect(rule?.ruleId).toBe(ruleId)
    expect(rule?.ruleName).toBe('rule1')
    expect(rule?.threshold).toBe(1.2)
  })

  // test('Retrieve a rule for non existing id', async () => {
  //   const id = -1
  //   await expect(getNotificationRuleById(id)).rejects.toThrow('Unable to retrieve notification rule')
  // })

  test('Update a rule', async () => {
    const updatedRule = await updateNotificationRule(ruleId, {
      ruleName: 'rule1.1',
      threshold: 1.3
    })
    expect(updatedRule.ruleName).toBe('rule1.1')
    expect(updatedRule?.threshold).toBe(1.3)
  })

  test('Delete a rule', async () => {
    await deleteNotificationRule(ruleId)
    const deletedRule = await prisma.notificationRules.findUnique({
      where: { ruleId }
    })
    expect(deletedRule).toBeNull()
  })
})
