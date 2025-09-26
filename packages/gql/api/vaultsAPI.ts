import { graphql } from '../generated';

export const UPLOAD_TO_VAULT_MUTATION = graphql(`
  mutation UploadVault($input: UploadVaultInput!) {
    uploadVault(input: $input)
  }
`);

export const TERMINATE_ALL_JOBS_MUTATION = graphql(`
  mutation Terminate {
    terminate
  }
`);
