import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import { PROJECT_ID, getGcpCertificate } from './main'

/**
 * @returns A new Secret Manager client that can be used to retrieve or store secrets.
 */
export const getSecretManagerClient = () => {
  const client = new SecretManagerServiceClient({
    credentials: getGcpCertificate()
  })
  return client
}

/**
 * Retrieves a secret from the GCP Secret Manager service.
 *
 * @param client The Secret Manager client (see getSecretManagerClient)
 * @param secretId The ID of the secret to retrieve
 * @returns The secret value
 * @throws Error if the secret does not exist
 */
export const retrieveSecret = async (client: SecretManagerServiceClient, secretId: string) => {
  const [version] = await client.accessSecretVersion({
    name: client.secretVersionPath(PROJECT_ID, secretId, 'latest')
  })
  const payload = version.payload?.data?.toString()
  return payload
}

/**
 * Creates a new or updates an existing secret in the GCP Secret Manager service.
 *
 * @param client The Secret Manager client (see getSecretManagerClient)
 * @param secretId The ID of the secret to create or update
 * @param secretValue The value of the secret
 */
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
