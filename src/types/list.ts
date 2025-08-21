export interface List {
  id: number;
  name: string;
  userId: number;
}

export interface ListItem {
  id: number;
  name: string;
  listId: number;
}
