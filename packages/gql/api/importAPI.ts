import { graphql } from '../generated';

export const GET_IMPORT_QUERY = graphql(`
  query Initiate($input: CreateImportInput!) {
    initiate(input: $input)
  }
`);
