interface RawCommentsResponseEntity {
  Count: number;
  Total: number;
  Results: RawComment[];
}

interface RawComment {
  User: string;
  Submitted: string;
  CommentText: string;
}

export type GetCommentsResponse = RawCommentsResponseEntity;
