import type { Comment } from "./comment.model";

interface CommentsResponseEntity {
  count: number;
  total: number;
  results: Comment[];
}

export type GetComments = CommentsResponseEntity;
