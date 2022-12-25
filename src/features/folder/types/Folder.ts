import { FolderFavorites } from '@/features/favoriteFolder/types'
import { Link } from '@/features/link/types/Link'
import { User } from '@/features/user/types/User'

export type Folder = {
  id: number
  name: string
  description?: string
  color?: string
  user_id?: number
  updated_at: string
  created_at: string
  links?: Link[]
  user?: User
  folder_favorites?: FolderFavorites[]
}
