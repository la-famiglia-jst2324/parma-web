import type {
  User,
  Company,
  Bucket,
  NotificationChannel,
  DataSource,
  SourceMeasurement,
  CompanySourceMeasurement,
  UserCustomization
} from '@prisma/client'
import {
  ChannelType,
  ChannelPurpose,
  FileType,
  HealthStatus,
  Frequency,
  ScheduleType,
  TaskStatus,
  BucketPermission,
  Role
} from '@prisma/client'
import { prisma } from './prisma/prismaClient'

function generateRandomAuthId(length = 32) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function generateRandomPdfUrl() {
  const randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = 'http://example.com/'
  for (let i = 0; i < 15; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
  }
  return result + '.pdf'
}

function getRandomEnumValue<T>(enumArray: T[]): T {
  const randomIndex = Math.floor(Math.random() * enumArray.length)
  return enumArray[randomIndex]
}

// Function to generate a random date between two dates
function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Function to generate a random integer within a range
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
// Function to generate a sentiment score for comment value
function randomSentimentScore(): number {
  return randomInt(1, 10)
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const newsSamples = [
  {
    message: "Annual Financial Report Shows Average Revenue Growth of 7.5% Across Major Industries",
    triggerFactor: "Average Revenue Growth",
    title: "Industries See Average 7.5% Revenue Growth",
    timestamp: new Date(2023, 3, 27, 20, 47, 14)
  },
  {
    message: "Recent Market Analysis Reveals Record Low Investment in Startups This Quarter",
    triggerFactor: "Minimum Investment Level",
    title: "Startups Hit by Record Low Investment",
    timestamp: new Date(2023, 2, 11, 20, 47, 14)
  },
  {
    message: "Total Sales Across E-commerce Platforms Surge to $5 Billion in the Last Quarter",
    title: "E-commerce Sales Hit $5 Billion Mark",
    timestamp: new Date(2023, 7, 27, 20, 47, 14)
  },
  {
    message: "Breakthrough in Renewable Energy Efficiency Opens New Opportunities for Sustainable Development",
    triggerFactor: "Scientific Breakthrough",
    title: "New Era in Green Energy",
    timestamp: new Date(2023, 7, 9, 20, 47, 14)
  },
  {
    message: "Global Fashion Brand Faces Supply Chain Disruption, Increasing Production and Distribution by %30",
    triggerFactor: "%30",
    title: "Fashion Industry Supply Woes",
    timestamp: new Date(2023, 9, 14, 20, 47, 14)
  },
  {
    message: "Pharmaceutical Company Releases New Vaccine, Marking a Major Step Forward in Medical Science",
    triggerFactor: "Medical Advancement",
    title: "Innovative Vaccine Hits the Market",
    timestamp: new Date(2023, 9, 31, 20, 48, 38)
  },
  {
    message: "Tech Startups Experience a Surge in Venture Capital Funding, Signaling Strong Market Confidence",
    triggerFactor: "Investment Surge",
    title: "Venture Capital Floods Tech Sector",
    timestamp: new Date(2023, 8, 27, 20, 48, 38)
  },
  {
    message: "Major Bank Announces New Digital Currency Initiative, Paving the Way for Future Financial Transactions",
    triggerFactor: "Digital Currency Launch",
    title: "Banking Sector Embraces Digital Currency",
    timestamp: new Date(2023, 1, 11, 20, 48, 38)
  },
  {
    message: "Global E-commerce Giant Expands to New Markets, Strengthening Its International Presence",
    triggerFactor: "Market Expansion",
    title: "E-commerce Expansion Announced",
    timestamp: new Date(2023, 6, 23, 20, 48, 38)
  },
  {
    message: "Airline Industry Faces Regulatory Changes That Could Alter the Future of Air Travel",
    triggerFactor: "Regulatory Update",
    title: "New Aviation Regulations Introduced",
    timestamp: new Date(2023, 4, 8, 20, 48, 38)
  },
  {
    message: "Major Security Breach at Leading Tech Firm Exposes Sensitive Data, Raising Concerns Over Digital Safety",
    triggerFactor: "Security Incident",
    title: "Tech Company Security Crisis",
    timestamp: new Date(2023, 11, 4, 20, 48, 38)
  },
  {
    message: "Automobile Manufacturer Recalls Latest Model Due to Safety Concerns, Affecting Thousands of Vehicles",
    triggerFactor: "Product Recall",
    title: "Auto Recall Shakes Industry",
    timestamp: new Date(2023, 4, 16, 20, 48, 38)
  },
  {
    message: "Biotech Firm Announces Major Strides in Gene Editing Technology, Potentially Transforming Medical Treatments",
    triggerFactor: "Biotech Advancement",
    title: "Gene Editing Breakthrough Announced",
    timestamp: new Date(2023, 4, 24, 20, 48, 38)
  },
  {
    message: "International Trade Deal Signed, Impacting Multiple Industries and Redefining Global Trade Relationships",
    triggerFactor: "Trade Agreement",
    title: "New Trade Deal Signed",
    timestamp: new Date(2023, 9, 26, 20, 48, 38)
  },
  {
    message: "Cutting-edge Robotics Company Unveils New Products, Setting a New Standard in the Robotics Industry",
    triggerFactor: "Product Launch",
    title: "Robotics Firm Reveals Future Tech",
    timestamp: new Date(2023, 5, 21, 20, 48, 38)
  }
];


async function main() {
  const startDate = new Date(2020, 0, 1) // Adjust as needed
  const endDate = new Date() // Today's date
  const minValue = 0 // Adjust as needed
  const maxValue = 10000 // Adjust as needed

  // Create Users
  const users: User[] = []
  for (let i = 0; i < 10; i++) {
    users.push(
      await prisma.user.create({
        data: {
          authId: generateRandomAuthId(),
          name: `User ${i}`,
          role: i % 5 === 0 ? Role.ADMIN : Role.USER
          // Add other fields as necessary
        }
      })
    )
  }

  let companyNames = ["Forto", "Personio", "Luminovo", "Langfuse", "Y42"]
  // Create Companies and relate to user
  const companies: Company[] = []
  for (let i = 0; i < 20; i++) {
    if (i < 5) {
      companies.push(
        await prisma.company.create({
          data: {
            name: companyNames[i],
            addedBy: users[Math.floor(i / 2)].id
            // Add other fields as necessary
          }
        })
      )
    } else {
      companies.push(
        await prisma.company.create({
          data: {
            name: `Company ${i}`,
            addedBy: users[Math.floor(i / 2)].id
            // Add other fields as necessary
          }
        })
      )
    }
  }

  // Create Buckets and relate to user
  const buckets: Bucket[] = []
  for (let i = 0; i < 3; i++) {
    buckets.push(
      await prisma.bucket.create({
        data: {
          ownerId: users[Math.floor(i * 3)].id,
          title: `Bucket ${i}`
        }
      })
    )
  }

  // Populate companyBucketMembership
  for (const company of companies) {
    for (const bucket of buckets) {
      await prisma.companyBucketMembership.create({
        data: {
          companyId: company.id,
          bucketId: bucket.id
          // created and modified dates will be set automatically
        }
      })
    }
  }

  const channels: NotificationChannel[] = []
  for (let i = 0; i < 5; i++) {
    const channel = await prisma.notificationChannel.create({
      data: {
        channelType: ChannelType.EMAIL,
        destination: `destination${i}@example.com`
      }
    })
    channels.push(channel)
  }

  for (let i = 0; i < 5; i++) {
    const channel = await prisma.notificationChannel.create({
      data: {
        channelType: ChannelType.SLACK,
        destination: `slack_destination_${i}`,
        secretId: `secret_id_${i}`
        // created and modified dates will be set automatically
      }
    })
    channels.push(channel)
  }

  // Create Notification Subscriptions for each user for each channel
  for (const user of users) {
    let i = 0
    for (const channel of channels) {
      if (i % 2 === 0) {
        await prisma.notificationSubscription.create({
          data: {
            userId: user.id,
            channelId: channel.id,
            channelPurpose: ChannelPurpose.NOTIFICATION // Adjust as per your ChannelPurpose enum
            // createdAt and modifiedAt will be set automatically to the current time
          }
        })
      } else {
        await prisma.notificationSubscription.create({
          data: {
            userId: user.id,
            channelId: channel.id,
            channelPurpose: ChannelPurpose.REPORT // Adjust as per your ChannelPurpose enum
            // createdAt and modifiedAt will be set automatically to the current time
          }
        })
      }
      i++
    }
  }

  // Create Company Attachments for each company for some users
  for (const company of companies) {
    for (const user of users) {
      // Limit the number of attachments per user per company if desired
      await prisma.companyAttachment.create({
        data: {
          companyId: company.id,
          fileType: FileType.PDF, // Adjust as per your FileType enum
          fileUrl: generateRandomPdfUrl(),
          userId: user.id,
          title: `Company ${company.id} Attachment for User ${user.id}`
          // createdAt and modifiedAt will be set automatically to the current time
        }
      })
    }
  }

  // Define all possible values for Frequency and HealthStatus
  const allFrequencies = Object.values(Frequency) // e.g., [Frequency.HOURLY, Frequency.DAILY, ...]
  const allHealthStatuses = Object.values(HealthStatus) // e.g., [HealthStatus.UP, HealthStatus.DOWN, ...]

  const sourceNames = ['Reddit Staging', 'Github Staging', 'Affinity Staging'] // Add more as needed
  const invocationEndpoints = [
    'https://reddit.sourcing.staging.parma.software/',
    'https://github.sourcing.staging.parma.software/',
    'https://affinity.sourcing.staging.parma.software/'
  ] // Add more as needed

  const dataSources: DataSource[] = []
  for (let i = 0; i < sourceNames.length; i++) {
    dataSources.push(
      await prisma.dataSource.create({
        data: {
          sourceName: sourceNames[i],
          isActive: Math.random() < 0.5, // Randomly true or false
          frequency: getRandomEnumValue(allFrequencies), // Or RANDOMLY pick from your Frequency enum
          healthStatus: getRandomEnumValue(allHealthStatuses), // Or RANDOMLY pick from your HealthStatus enum
          description: `Description for ${sourceNames[i]}`,
          maxRunSeconds: Math.floor(Math.random() * 600), // Random between 0-600
          version: '1.0', // or any logic for versioning
          invocationEndpoint: invocationEndpoints[i]
          // createdAt and modifiedAt will be set automatically
        }
      })
    )
  }

  const allScheduleTypes = Object.values(ScheduleType)
  const allTaskStatuses = Object.values(TaskStatus)
  // Create Scheduled Tasks for each data source
  for (const dataSource of dataSources) {
    await prisma.scheduledTask.create({
      data: {
        dataSourceId: dataSource.id,
        scheduleType: getRandomEnumValue(allScheduleTypes), // Random schedule type
        scheduledAt: new Date(), // Set to current time or any logic you prefer
        // ... other fields
        status: getRandomEnumValue(allTaskStatuses) // Random task status
        // createdAt and modifiedAt will be set automatically
      }
    })
  }

  const allBucketPermissions = Object.values(BucketPermission)
  // Create BucketAccess records for each bucket for some users
  for (const bucket of buckets) {
    for (const user of users) {
      await prisma.bucketAccess.create({
        data: {
          bucketId: bucket.id,
          inviteeId: user.id,
          permission: getRandomEnumValue(allBucketPermissions) // Random bucket permission
          // createdAt and modifiedAt will be set automatically
        }
      })
    }
  }

  // Create Notifications for each company for each data source
  for (const company of companies) {
    for (const dataSource of dataSources) {
      await prisma.notification.create({
        data: {
          message: `Notification for Company: ${company.name} and DataSource: ${dataSource.sourceName}`,
          companyId: company.id,
          dataSourceId: dataSource.id
          // createdAt and modifiedAt will be set automatically
        }
      })
    }
  }

  // Define possible values for type and measurementName
  const possibleTypes = ['int', 'int', 'int', 'float', 'paragraph', 'text'] // Add more as needed
  const possibleMeasurementNames = [
    '# of Employees',
    '# of Stars',
    '# of followers',
    'Monthly Revenue',
    'Review',
    'Event'
  ]

  // Create SourceMeasurements for each data source
  const sourceMeasurements: SourceMeasurement[] = []
  for (const dataSource of dataSources) {
    for (let i = 0; i < 3; i++) {
      // Adjust the number of measurements as needed
      const random = Math.floor(Math.random() * possibleTypes.length)
      sourceMeasurements.push(
        await prisma.sourceMeasurement.create({
          data: {
            sourceModuleId: dataSource.id,
            type: possibleTypes[random], // Random type
            measurementName: possibleMeasurementNames[random] // Random measurement name
          }
        })
      )
    }
  }
  // After creating all SourceMeasurements, optionally assign a parentMeasurementId to some of them
  for (const measurement of sourceMeasurements) {
    // Decide randomly whether to assign a parentMeasurementId or not
    if (Math.random() < 0.5) { // Adjust the probability as needed
      // Select a random SourceMeasurement's id as the parentMeasurementId
      const randomParentIndex = Math.floor(Math.random() * sourceMeasurements.length)
      const parentMeasurementId = sourceMeasurements[randomParentIndex].id

      // Make sure not to assign a measurement as its own parent
      if (parentMeasurementId !== measurement.id) {
        await prisma.sourceMeasurement.update({
          where: { id: measurement.id },
          data: { parentMeasurementId }
        })
      }
    }
  }


  // Create CompanySourceMeasurements for each company for some source measurements
  const companySourceMeasurements: CompanySourceMeasurement[] = []
  for (const company of companies) {
    for (const sourceMeasurement of sourceMeasurements) {
      // You might want to add additional logic to avoid duplicate entries
      companySourceMeasurements.push(
        await prisma.companySourceMeasurement.create({
          data: {
            companyId: company.id,
            sourceMeasurementId: sourceMeasurement.id
            // Other measurement values can be added here as needed
          }
        })
      )
    }
  }

  // Create MeasurementTextValues for each company source measurement
  for (const csm of companySourceMeasurements) {
    // Create a few text values for each company source measurement
    for (let i = 0; i < 3; i++) {
      // Adjust the number of text values as needed
      await prisma.measurementTextValue.create({
        data: {
          companyMeasurementId: csm.companyMeasurementId,
          value: `Sample text value ${i} for measurement ${csm.companyMeasurementId}`,
          timestamp: randomDate(startDate, endDate) // Set to current time or any logic you prefer
          // createdAt and modifiedAt will be set automatically
        }
      })
      await prisma.measurementIntValue.create({
        data: {
          companyMeasurementId: csm.companyMeasurementId,
          value: randomInt(minValue, maxValue), // Random integer within the range
          timestamp: randomDate(startDate, endDate) // Random timestamp within the fixed range
          // createdAt and modifiedAt will be set automatically
        }
      })
      await prisma.measurementFloatValue.create({
        data: {
          companyMeasurementId: csm.companyMeasurementId,
          value: Math.random() * (maxValue - minValue) + minValue, // Random float within the range
          timestamp: randomDate(startDate, endDate) // Random timestamp within the fixed range
          // createdAt and modifiedAt will be set automatically
        }
      })
      await prisma.measurementParagraphValue.create({
        data: {
          companyMeasurementId: csm.companyMeasurementId,
          value: `Sample paragraph value for measurement ${csm.companyMeasurementId}`,
          timestamp: randomDate(startDate, endDate) // Random timestamp within the fixed range
          // createdAt and modifiedAt will be set automatically
        }
      })
      //
      await prisma.measurementCommentValue.create({
        data: {
          companyMeasurementId: csm.companyMeasurementId,
          value: `Sample comment value for measurement ${csm.companyMeasurementId}`,
          timestamp: randomDate(startDate, endDate), // Random timestamp within the fixed range
          sentimentScore: randomSentimentScore()
          // createdAt and modifiedAt will be set automatically
        }
      })
    }
  }

  // Create Reports for each company
  for (const company of companies) {
    // Create a few reports for each company
    for (let i = 0; i < 3; i++) {
      // Adjust the number of reports as needed
      await prisma.report.create({
        data: {
          companyId: company.id,
          name: `Report ${i + 1} for Company ${company.id}`,
          reportFileUrl: generateRandomPdfUrl(), // Random report file URL
          createdAt: randomDate(startDate, endDate) // Random creation date within the fixed range
          // modifiedAt will be set automatically to the current time
        }
      })
    }
  }

  // Create UserImportantMeasurementPreferences for each user for each data source
  for (const user of users) {
    for (const dataSource of dataSources) {
      for (const fieldName of possibleMeasurementNames) {
        // Avoiding duplicate entries with a unique combination of dataSourceId, userId, and importantFieldName
        const existingPreference = await prisma.userImportantMeasurementPreference.findUnique({
          where: {
            dataSourceId_userId_importantFieldName: {
              dataSourceId: dataSource.id,
              userId: user.id,
              importantFieldName: fieldName
            }
          }
        })

        if (!existingPreference) {
          await prisma.userImportantMeasurementPreference.create({
            data: {
              dataSourceId: dataSource.id,
              userId: user.id,
              importantFieldName: fieldName
              // createdAt and modifiedAt will be set automatically
            }
          })
        }
      }
    }
  }

  // Create NewsSubscriptions for each user for some companies
  for (const user of users) {
    for (const company of companies) {
      // You might want to add additional logic to avoid duplicate entries
      await prisma.newsSubscription.create({
        data: {
          userId: user.id,
          companyId: company.id
          // createdAt and modifiedAt will be set automatically
        }
      })
    }
  }

  // Sample customization names
  const customizations = ['Analytics X', 'Analytics Y', 'Analytics Z']
  const userCustomizations: UserCustomization[] = []
  for (const user of users) {
    for (const customization of customizations) {
      userCustomizations.push(
        await prisma.userCustomization.create({
          data: {
            name: customization,
            userId: user.id
          }
        })
      )
    }
  }

  for (const company of companies) {
    for (const customization of userCustomizations) {
      await prisma.userCompanyCustomization.create({
        data: {
          companyId: company.id,
          customizationId: customization.id
        }
      })
    }
  }

  for (let i = 0; i < users.length / 2; i++) {
    for (const company of companies) {
      await prisma.companySubscription.create({
        data: {
          userId: users[i].id,
          companyId: company.id
        }
      })
    }
  }

  // Create news
  for (let i = 0; i < 5; i++) {
    const company = companies[i];
    // Assign 3 news items to each company
    for (let i = 0; i < 3; i++) {
      const newsSample = newsSamples[i + companies.indexOf(company) * 3];
      const randomDataSource = getRandomElement(dataSources);
      const randomSourceMeasurement = getRandomElement(sourceMeasurements);
      // Create news item with a random data source and source measurement
      await prisma.news.create({
        data: {
          message: newsSample.message,
          companyId: company.id,
          dataSourceId: randomDataSource.id,
          triggerFactor: newsSample.triggerFactor,
          title: newsSample.title,
          timestamp: newsSample.timestamp,
          sourceMeasurementId: randomSourceMeasurement.id
        }
      });
    }
  }

  console.log('Database has been populated!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
