import { graphql } from '../generated';

export const GET_CREATOR_ASSETS_QUERY = graphql(`
  query GetCreatorAssets($input: PaginationInput!) {
    getCreatorAssets(input: $input) {
      assetId
      createdAt
      creatorId
      deletedAt
      id
      type
      asset {
        blurredUrl
        createdAt
        creatorId
        fileType
        id
        mediaType
        mimeType
        rawUrl
        updatedAt
      }
    }
  }
`);

export const DELETE_CREATOR_ASSETS_MUTATION = graphql(`
  mutation DeleteCreatorAssets($input: DeleteCreatorAsset!) {
    deleteCreatorAssets(input: $input)
  }
`);

export const DELETE_ALL_ASSETS_MUTATION = graphql(`
  mutation DeleteAllAssets {
    deleteAllAssets
  }
`);

export const UPDATE_ASSETS_MUTATION = graphql(`
  mutation UpdateAssets($input: UpdateAssetsInput!) {
    updateAssets(input: $input) {
      assetId
      createdAt
      creatorId
      deletedAt
      id
      type
      asset {
        blurredUrl
        createdAt
        creatorId
        fileType
        id
        mediaType
        mimeType
        rawUrl
        updatedAt
      }
    }
  }
`);
