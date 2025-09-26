import { graphql } from '../generated';

export const INITIATE_CREATOR_OBJECTS_IMPORT_MUTATION = graphql(`
  mutation InitiateCreatorObjectsImport($input: CreateImportQueueInput!) {
    initiateCreatorObjectsImport(input: $input)
  }
`);
