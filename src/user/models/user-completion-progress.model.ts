import type { UserCompletionProgressEntity } from "./user-completion-progress-entity.model";

export interface UserCompletionProgress {
  count: number;
  total: number;
  results: UserCompletionProgressEntity[];
}
