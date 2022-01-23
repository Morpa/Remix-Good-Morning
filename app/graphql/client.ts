import { GraphQLClient } from 'graphql-request'

const endpoint =
  'https://api-eu-central-1.graphcms.com/v2/ckyo35vu819ir01yu9y4k55xk/master'

export const client = new GraphQLClient(endpoint)
