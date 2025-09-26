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
