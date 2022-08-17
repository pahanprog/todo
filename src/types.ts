export interface TodoItem {
  slug: string;
  title: string;
  createdAt: Date;
  inProgress: boolean;
  complete: boolean;
  description?: string;
}

export interface TodoItemPartial {
  title: string;
  description?: string;
}
