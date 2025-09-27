import { graphql } from '../generated';

export const INITIATE_CREATOR_OBJECTS_IMPORT_MUTATION = graphql(`
  mutation InitiateCreatorObjectsImport($input: CreateImportQueueInput!) {
    initiateCreatorObjectsImport(input: $input)
  }
`);

export const INITIATE_SINGLE_CREATOR_IMPORT_QUERY = graphql(`
  query Initiate($input: CreateImportQueueInput!) {
    initiate(input: $input)
  }
`);
