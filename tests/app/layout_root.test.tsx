import RootLayout, { metadata } from '@/app/layout'
import '@testing-library/jest-dom'

describe('RootLayout Component', () => {
  it('test metadata', () => {
    expect(metadata).toBeTruthy()
    expect(metadata.title).toBe('ParmaUI')
    expect(metadata.description).toBe('Frontend for interaction with ParmaAI, a vc monitoring system')
  })
  it('root layout', () => {
    const rendered = RootLayout({
      children: <span>SomeString</span>
    })
    expect(rendered).toBeTruthy()
  })
})
