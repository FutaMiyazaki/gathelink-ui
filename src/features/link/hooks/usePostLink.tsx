import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
import { folderHasLinksState } from '@/states/FolderHasLinksAtom'
import { authHeaders } from '@/utils/authHeaders'

type UsePostLink = {
  postLink: (link: params) => Promise<void>
  errorMessage: string
  isPosting: boolean
  resStatus: number
}

type params = {
  title: string
  url: string
  folder_id: number
}

export const usePostLink = (): UsePostLink => {
  const [isPosting, setIsPosting] = useState(false)
  const [resStatus, setResStatus] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const setAlert = useSetRecoilState(alertState)
  const setFolderHasLinks = useSetRecoilState(folderHasLinksState)
  const headers = authHeaders()

  const postLink = async (link: params): Promise<void> => {
    setIsPosting(true)
    setResStatus(0)
    setErrorMessage('')

    await apiClient
      .post('/links', { link }, { headers })
      .then((res) => {
        setResStatus(res.status)
        navigate(`/folder/${res.data.folder.id as string}`)
        setAlert({
          isShow: true,
          message: 'リンクを追加しました',
        })
        setFolderHasLinks((prevFolderHasLinks) => {
          const newFolderHasLinks = [...prevFolderHasLinks, res.data.link]
          return newFolderHasLinks
        })
      })
      .catch((err) => {
        setErrorMessage(err.response.data.base[0])
        setResStatus(err.status)
      })
      .finally(() => {
        setIsPosting(false)
      })
  }

  return {
    postLink,
    errorMessage,
    isPosting,
    resStatus,
  }
}
