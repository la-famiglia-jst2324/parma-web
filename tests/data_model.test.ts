import type { User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('User Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  let userId: string

  // Create User Test
  test('Create a new user with valid details', async () => {
    const user: User = await prisma.user.create({
      data: {
        name: 'John Doe',
        role: 'USER'
      }
    })

    userId = user.id // Store the user ID for later use

    expect(user).toHaveProperty('id')
    expect(user.name).toBe('John Doe')
    expect(user.role).toBe('USER')
  })

  test('Create a new user with valid details', async () => {
    const user: User = await prisma.user.create({
      data: {
        name: 'Mr Burns',
        role: 'ADMIN'
      }
    })

    userId = user.id // Store the user ID for later use

    expect(user).toHaveProperty('id')
    expect(user.role).toBe('ADMIN')
  })

  // Read User Test
  test('Retrieve a user by ID', async () => {
    const user: User | null = await prisma.user.findUnique({
      where: { id: userId }
    })

    expect(user).toBeTruthy()
    expect(user?.id).toBe(userId)
  })

  // Update User Test
  test('Update a user name', async () => {
    const updatedUser: User = await prisma.user.update({
      where: { id: userId },
      data: { name: 'Jane Doe' }
    })

    expect(updatedUser.name).toBe('Jane Doe')
  })

  // Delete User Test
  test('Delete a user', async () => {
    await prisma.user.delete({
      where: { id: userId }
    })

    const user: User | null = await prisma.user.findUnique({
      where: { id: userId }
    })

    expect(user).toBeNull()
  })
})
