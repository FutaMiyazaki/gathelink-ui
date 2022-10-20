import { Link } from '@/features/link/types/Link'
import { User } from '@/features/user/types/User'

export type Folder = {
  id: number
  name: string
  updated_at: string
  created_at?: string
  links?: Link[]
  user?: User
}
