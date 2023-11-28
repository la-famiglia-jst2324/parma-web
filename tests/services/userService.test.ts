import { PrismaClient, Role } from '@prisma/client'
import { genRandomDummyAuthId } from './utils/random'
import { createUser, getUserById, deleteUser, updateUser } from '@/pages/api/services/userService'
const prisma = new PrismaClient()

describe('User Model Tests', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  let userId: number

  // Create User Test
  test('Create a new user with valid details', async () => {
    const user = await createUser({ name: 'John Doe', authId: genRandomDummyAuthId(), role: Role.USER })
    userId = user.id // Store the user ID for later use
    const username = (await getUserById(userId)).name
    expect(username).toBe('John Doe')
    expect(user).toHaveProperty('id')
    expect(user.name).toBe('John Doe')
    expect(user.role).toBe('USER')
  })

  test('Create a new user with valid details', async () => {
    const user = await createUser({ name: 'Mr Burns', authId: genRandomDummyAuthId(), role: Role.ADMIN })
    userId = user.id // Store the user ID for later use
    const username = (await getUserById(userId)).name
    expect(username).toBe('Mr Burns')
    expect(user).toHaveProperty('id')
    expect(user.role).toBe('ADMIN')
    const user1 = await getUserById(userId)
    expect(user1).toBeTruthy()
    expect(user1?.id).toBe(userId)
  })

  // Read User Test
  test('Retrieve a user by ID', async () => {
    const user = await getUserById(userId)
    expect(user).toBeTruthy()
    expect(user?.id).toBe(userId)
  })

  // Update User Test
  test('Update a user name', async () => {
    const updatedUser = await updateUser(userId, { name: 'Jane Doe' })
    expect(updatedUser.name).toBe('Jane Doe')
  })

  // Delete User Test
  test('Delete a user', async () => {
    await deleteUser(userId)
    const deletedUser = await prisma.user.findUnique({
      where: { id: userId }
    })
    expect(deletedUser).toBeNull()
  })
})
