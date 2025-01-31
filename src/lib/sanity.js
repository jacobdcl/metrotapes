import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const config = {
  projectId: 'l3itmzli',
  dataset: 'production',
  apiVersion: '2024-01-30',
  useCdn: true, // Enable CDN caching for better performance
  perspective: 'published'
}

// Create a client for fetching data (read-only)
export const client = createClient(config)

// Create an image URL builder
const builder = imageUrlBuilder(client)

// Helper function to build image URLs
export const urlFor = (source) => {
  if (!source?.asset) return ''
  return builder.image(source)
} 