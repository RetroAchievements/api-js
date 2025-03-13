import type { CommentEntity } from "./comment-entity.model";

export interface CommentsResponse {
  count: number;
  total: number;
  results: CommentEntity[];
}
