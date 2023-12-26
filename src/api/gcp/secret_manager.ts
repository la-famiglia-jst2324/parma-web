import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import { PROJECT_ID, getGcpCertificate } from './main'

export const getSecretManagerClient = () => {
  const client = new SecretManagerServiceClient({
    credentials: getGcpCertificate()
  })
  return client
}

export const retrieveSecret = async (client: SecretManagerServiceClient, secretId: string) => {
  const [version] = await client.accessSecretVersion({
    name: client.secretVersionPath(PROJECT_ID, secretId, 'latest')
  })
  const payload = version.payload?.data?.toString()
  return payload
}

export const storeSecret = async (client: SecretManagerServiceClient, secretId: string, secretValue: string) => {
  let needsCreation = false
  try {
    await client.getSecret({
      name: client.secretPath(PROJECT_ID, secretId)
    })
  } catch (e) {
    if (e instanceof Error && e.message.includes('NOT_FOUND: Secret')) {
      needsCreation = true
    } else {
      throw e
    }
  }

  if (needsCreation) {
    await client.createSecret({
      parent: `projects/${PROJECT_ID}`,
      secretId,
      secret: {
        replication: {
          automatic: {}
        }
      }
    })
  }

  await client.addSecretVersion({
    parent: client.secretPath(PROJECT_ID, secretId),
    payload: {
      data: Buffer.from(secretValue, 'utf8')
    }
  })
}
