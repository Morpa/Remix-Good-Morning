import { gql } from 'graphql-request'

export const GET_PHRASES = gql`
  query getPhrases {
    items {
      id
      flag
      language
      phrase
    }
  }
`
