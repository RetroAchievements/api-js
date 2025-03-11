interface CommentEntity {
  user: string;
  submitted: string;
  commentText: string;
}

interface CommentsEntity {
  count: number;
  total: number;
  results: CommentEntity[];
}

export type Comments = CommentsEntity;
export type Comment = CommentEntity;
