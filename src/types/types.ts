export interface IArticleProps {
    userId: number
    id: number
    title: string
    description: string
}
export interface CreateArticleDataTransferObject {
  title: string
  description: string
}
export interface UpdateArticleDataTransferObject {
  title?: string
  description?: string
}
export interface IArticle {
  article: IArticleProps
}

export interface RegisterUserDTO {
  username: string
  email: string
  password: string
}
export interface LoginUserDTO {
  email: string
  password: string
}
export interface JWTPayload {
  id: number
  isAdmin: boolean
  username: string
}