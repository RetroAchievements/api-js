interface RawComment {
  User: string;
  Submitted: string;
  CommentText: string;
}

interface RawCommentsResponseEntity {
  Count: number;
  Total: number;
  Results: RawComment[];
}

export type GetCommentsResponse = RawCommentsResponseEntity;
