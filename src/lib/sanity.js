import { createClient } from '@sanity/client'

const config = {
  projectId: 'l3itmzli',
  dataset: 'production',
  apiVersion: '2024-01-30',
  useCdn: true, // Enable CDN caching for better performance
  perspective: 'published'
}

// Create a client for fetching data (read-only)
export const client = createClient(config)

// Helper function to build image/file URLs
export const urlFor = (source) => {
  if (!source?.asset?.url) return null
  return source.asset.url
} 