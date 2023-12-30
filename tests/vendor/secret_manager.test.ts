/*
 * @jest-environment node
 */
import { v4 as uuid } from 'uuid'
import { PROJECT_ID } from '../../src/api/gcp/main'
import { getSecretManagerClient, retrieveSecret, storeSecret } from '../../src/api/gcp/secret_manager'

describe('Secret Manager interface', () => {
  it('store & retrieve tests', async () => {
    const secretId = `parma-analytics-ci-test-${uuid()}`
    const secretValue = 'test_value'

    const secretClient = getSecretManagerClient()
    await storeSecret(secretClient, secretId, secretValue)

    const readSecret = await retrieveSecret(secretClient, secretId)
    expect(readSecret).toEqual(secretValue)

    // new value
    const newSecretValue = 'test_value2'
    await storeSecret(secretClient, secretId, newSecretValue)

    // sleep 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const readSecretNew = await retrieveSecret(secretClient, secretId)
    expect(readSecretNew).toEqual(newSecretValue)

    await secretClient.deleteSecret({
      name: secretClient.secretPath(PROJECT_ID, secretId)
    })
  }, 20000)
})
