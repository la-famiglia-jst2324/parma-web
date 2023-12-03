import { prisma } from '../prisma/prismaClient'

const createUserCompanyCustomization = async (data: { customizationId: number; companyId: number }) => {
  try {
    const userCompanyCustomization = await prisma.userCompanyCustomization.create({
      data: {
        customizationId: data.customizationId,
        companyId: data.companyId
      }
    })
    return userCompanyCustomization
  } catch (error) {
    console.error('Error creating user company customization:', error)
    throw new Error('Unable to create user company customization')
  }
}

const getCompanyCustomizationsByCustomizationId = async (customizationId: number) => {
  try {
    return await prisma.userCompanyCustomization.findMany({ where: { customizationId } })
  } catch (error) {
    throw new Error(`Unable to retrieve companies in customization with id ${customizationId}`)
  }
}

export { createUserCompanyCustomization, getCompanyCustomizationsByCustomizationId }
