import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import { PROJECT_ID, getGcpCertificate } from './main'

export const getSecretManagerClient = () => {
  const client = new SecretManagerServiceClient({
    credentials: JSON.parse(getGcpCertificate())
  })
  return client
}

export const decryptSecret = async (client: SecretManagerServiceClient, secretId: string) => {
  const [version] = await client.accessSecretVersion({
    name: client.secretVersionPath(PROJECT_ID, secretId, 'latest')
  })
  const payload = version.payload?.data?.toString()
  return payload
}

export const encryptSecret = async (client: SecretManagerServiceClient, secretId: string, secretValue: string) => {
  try {
    console.log(
      await client.getSecret({
        name: client.secretPath(PROJECT_ID, secretId)
      })
    )
  } catch (e) {
    if (e instanceof Error && e.message.includes('NOT_FOUND: Secret')) {
      await client.createSecret({
        parent: `projects/${PROJECT_ID}`,
        secretId,
        secret: {
          replication: {
            automatic: {}
          }
        }
      })
    } else throw e
  }

  await client.addSecretVersion({
    parent: client.secretPath(PROJECT_ID, secretId),
    payload: {
      data: Buffer.from(secretValue, 'utf8')
    }
  })
}
