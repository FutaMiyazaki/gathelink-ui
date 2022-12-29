import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { apiClient } from '@/lib/axios/apiClient'
import { alertState } from '@/states/AlertAtom'
import { folderHasLinksState } from '@/states/FolderHasLinksAtom'
import { authHeaders } from '@/utils/authHeaders'

type UseDeleteLink = {
  deleteLink: (folderId: string, linkId: string) => Promise<void>
  errorMessage: string
  isDeleting: boolean
  resStatus: number
}

export const useDeleteLink = (): UseDeleteLink => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [resStatus, setResStatus] = useState(0)
  const setAlert = useSetRecoilState(alertState)
  const [folderHasLinks, setFolderHasLinks] = useRecoilState(folderHasLinksState)
  const headers = authHeaders()
  const navigate = useNavigate()

  const deleteLink = async (folderId: string, linkId: string): Promise<void> => {
    setIsDeleting(true)

    await apiClient
      .delete(`/links/${linkId}`, { headers })
      .then((res) => {
        setResStatus(res.status)
        navigate(`/folder/${folderId}`)
        setAlert({
          isShow: true,
          message: 'フォルダを削除しました',
        })
        if (folderHasLinks.length !== 0) {
          const afterFolderHasLinks = folderHasLinks.filter((link) => {
            return link.id.toString() !== linkId
          })
          setFolderHasLinks(afterFolderHasLinks)
        }
      })
      .catch((err) => {
        setErrorMessage(err.message)
        setResStatus(err.status)
      })
      .finally(() => {
        setIsDeleting(false)
      })
  }

  return {
    deleteLink,
    errorMessage,
    isDeleting,
    resStatus,
  }
}
