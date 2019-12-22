export const LIST_TODO_QUERY = `
  select t.id, t.description, t.trash, t.completed, c."name" as category_name, u."name" as user_name
  from todo.todo t
  left join todo.category c on t.category_id = c.id
  join todo."user" u on t.user_id = u.id
  where t.trash = $1
`;

export const TODO_BY_ID = `
  select t.id, t.description, t.trash, t.completed, c."name" as category_name, u."name" as user_name
  from todo.todo t
  join todo.category c on t.category_id = c.id
  join todo."user" u on t.user_id = u.id
  where t.id = $1
`;

export const CREATE_TODO = `
  insert into todo.todo (description, category_id, user_id)
  values ($1, $2, $3)
  returning *
`;

export const DELETE_TODO = `
  delete from todo.todo t
  where t.id = $1 and t.trash = true;
`;

export const DELETE_ALL_TRASHED_TODOS = `
  delete from todo.todo t
  where t.trash = true
`;

export const UPDATE_TODO = (updateParams: string) => `update todo.todo ${updateParams}`;

export const LIST_CATEGORY = `
  select c.id, c."name"
  from todo.category c;
`;

export const CREATE_CATEGORY = `
  insert into todo.category ("name")
  values ($1)
  returning *
`;
