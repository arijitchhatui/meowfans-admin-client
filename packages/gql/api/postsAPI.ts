import { graphql } from '../generated';

export const GET_POSTS_QUERY = graphql(`
  query GetPosts($input: PaginationInput!) {
    getPosts(input: $input) {
      caption
      commentCount
      createdAt
      creatorId
      deletedAt
      id
      lastCommentId
      likeCount
      saveCount
      shareCount
      totalEarning
      types
      unlockPrice
      updatedAt
    }
  }
`);

export const GET_POSTS_INFO_QUERY = graphql(`
  query GetPostsInfo($input: PaginationInput!) {
    getPostsInfo(input: $input) {
      caption
      commentCount
      createdAt
      creatorId
      deletedAt
      id
      lastCommentId
      latestComment
      likeCount
      saveCount
      shareCount
      totalEarning
      types
      unlockPrice
      updatedAt
    }
  }
`);

export const CREATE_POST_MUTATION = graphql(`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      caption
      commentCount
      createdAt
      creatorId
      deletedAt
      id
      lastCommentId
      likeCount
      saveCount
      shareCount
      totalEarning
      types
      unlockPrice
      updatedAt
    }
  }
`);

export const CREATE_COMMENT_MUTATION = graphql(`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      comment
      createdAt
      deletedAt
      fanId
      id
      postId
      updatedAt
    }
  }
`);

export const UPDATE_COMMENT_INPUT_MUTATION = graphql(`
  mutation UpdateComment($input: UpdateCommentInput!) {
    updateComment(input: $input) {
      comment
      createdAt
      deletedAt
      fanId
      id
      postId
      updatedAt
    }
  }
`);

export const DELETE_COMMENT_MUTATION = graphql(`
  mutation DeleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input)
  }
`);

export const UPDATE_POST_MUTATION = graphql(`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      caption
      commentCount
      createdAt
      creatorId
      deletedAt
      id
      likeCount
      saveCount
      shareCount
      totalEarning
      types
      unlockPrice
      updatedAt
    }
  }
`);

export const DELETE_POST_MUTATION = graphql(`
  mutation DeletePost($input: DeletePostInput!) {
    deletePost(input: $input)
  }
`);

export const DELETE_POSTS_MUTATION = graphql(`
  mutation DeletePosts($input: DeletePostsInput!) {
    deletePosts(input: $input)
  }
`);

export const LIKE_POST_MUTATION = graphql(`
  mutation LikePost($input: LikePostInput!) {
    likePost(input: $input) {
      caption
      commentCount
      createdAt
      creatorId
      deletedAt
      id
      likeCount
      saveCount
      shareCount
      totalEarning
      types
      unlockPrice
      updatedAt
    }
  }
`);

export const SAVE_POST_MUTATION = graphql(`
  mutation SavePost($input: SavePostInput!) {
    savePost(input: $input) {
      caption
      commentCount
      createdAt
      creatorId
      deletedAt
      id
      likeCount
      saveCount
      shareCount
      totalEarning
      types
      unlockPrice
      updatedAt
    }
  }
`);


