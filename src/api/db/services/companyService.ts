import { prisma } from '../prisma/prismaClient'

const createCompany = async (data: { name: string; description?: string; addedBy: number }) => {
  try {
    return await prisma.company.create({
      data: {
        name: data.name,
        description: data.description,
        addedBy: data.addedBy
      }
    })
  } catch (error) {
    console.error('Error creating company:', error)
    throw new Error('Unable to create company')
  }
}

const getCompanyByID = async (id: number) => {
  try {
    const company = await prisma.company.findUnique({
      where: { id }
    })
    if (!company) {
      throw new Error(`Company with ID ${id} not found.`)
    }
    return company
  } catch (error) {
    console.error('Error getting a company by ID:', error)
    throw error
  }
}

const getCompanyByName = async (name: string, page: number, pageSize: number) => {
  try {
    const skip = (page - 1) * pageSize
    const company = await prisma.company.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      },
      skip,
      take: pageSize
    })

    const totalCount = await prisma.company.count({
      where: {
        name
      }
    })
    const totalPages = Math.ceil(totalCount / pageSize)
    if (company) {
      return {
        company,
        pagination: {
          currentPage: page,
          pageSize,
          totalPages,
          totalCount
        }
      }
    }
    if (!company) {
      throw new Error(`Company with name ${name} not found.`)
    }
    return company
  } catch (error) {
    console.error('Error finding company by name:', error)
    throw error
  }
}

const getAllCompanies = async (page: number, pageSize: number) => {
  try {
    const skip = (page - 1) * pageSize
    const companies = await prisma.company.findMany({
      skip,
      take: pageSize
    })
    const totalCount = await prisma.bucket.count()
    const totalPages = Math.ceil(totalCount / pageSize)
    return {
      companies,
      pagination: {
        currentPage: page,
        pageSize,
        totalPages,
        totalCount
      }
    }
  } catch (error) {
    console.error('Error fetching all companies:', error)
    throw error
  }
}

const getAllCompaniesWithoutPagi = async () => {
  try {
    const companies = await prisma.company.findMany()
    return companies
  } catch (error) {
    console.error('Error fetching all companies:', error)
    throw error
  }
}

const updateCompany = async (
  id: number,
  data: {
    name?: string
    description?: string
  }
) => {
  return await prisma.company.update({
    where: { id },
    data: {
      ...data
    }
  })
}

const deleteCompany = async (id: number) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      //  delete its relationship with bucket
      await prisma.companyBucketMembership.deleteMany({
        where: {
          companyId: id
        }
      })

      // delete company record
      return await prisma.company.delete({
        where: { id }
      })
    })
    return result
  } catch (error) {
    console.error('Error deleting company:', error)
    throw error
  }
}

export {
  createCompany,
  getCompanyByID,
  getCompanyByName,
  getAllCompanies,
  getAllCompaniesWithoutPagi,
  updateCompany,
  deleteCompany
}
