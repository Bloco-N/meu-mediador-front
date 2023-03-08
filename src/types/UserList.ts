import { UserCard } from "./UserCard"

export type UserList = {
  list: UserCard []
  currentPage: number
  totalOfPages: number
}