import { graphql } from '../generated';

export const DOWNLOAD_CREATOR_OBJECTS_AS_BATCH_MUTATION = graphql(`
  mutation DownloadCreatorObjectsAsBatch($input: UploadVaultQueueInput!) {
    downloadCreatorObjectsAsBatch(input: $input)
  }
`);

export const TERMINATE_ALL_JOBS_MUTATION = graphql(`
  mutation Terminate {
    terminate
  }
`);

export const GET_TOTAL_VAULT_OBJECTS_COUNT_BY_TYPE_QUERY = graphql(`
  query GetTotalObjectsAsType($input: PaginationInput!) {
    getTotalObjectsAsType(input: $input)
  }
`);

export const CLEAN_UP_VAULT_OBJECTS_OF_A_CREATOR_MUTATION = graphql(`
  mutation CleanUpVaultObjectsOfACreator($input: CleanUpVaultInput!) {
    cleanUpVaultObjectsOfACreator(input: $input)
  }
`);
