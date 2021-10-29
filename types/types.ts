export interface U {
  name: string,
  email: string,
  password: string,
  id: string,
  img: string
}
export interface IMessage {
  readonly type: String,
  readonly message: String
}

export interface IMessages{
  [key: string]: IMessage
}

export interface IFoundations {
  [key: string]: string
}

export type Uid = string | null
export type User = null | Object


