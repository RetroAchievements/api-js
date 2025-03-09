interface CommentsResponseEntity {
  Count: number;
  Total: number;
  Results: CommentEntity[];
}

interface CommentEntity {
  User: string;
  Submitted: string;
  CommentText: string;
}
export type GetComments = CommentsResponseEntity;
// export type CommentEntity = CommentEntity;
