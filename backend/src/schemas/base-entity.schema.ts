export type GetManyParams<Cursor, Where, OrderBy, Include> = {
  skip?: number
  take?: number
  cursor?: Cursor
  where?: Where
  orderBy?: OrderBy
  include?: Include
}

export type GetByIdParams = {
  id: string
}

export type CreateParams<Data> = {
  data: Data
}

export type UpdateParams<Where, Data> = {
  where: Where
  data: Data
}

export type UpdateByIdParams<Data> = {
  id: string
  data: Data
}

export type DeleteParams<Where> = {
  where: Where
}

export type DeleteByIdParams = {
  id: string
}

export type BaseEntity<Cursor, Where, OrderBy, Data, Include> = {
  getMany: GetManyParams<Cursor, Where, OrderBy, Include>
  getById: GetByIdParams
  create: CreateParams<Data>
  update: UpdateParams<Where, Data>
  updateById: UpdateByIdParams<Data>
  delete: DeleteParams<Where>
  deleteById: DeleteByIdParams
  count: GetManyParams<Cursor, Where, OrderBy, never>
}
