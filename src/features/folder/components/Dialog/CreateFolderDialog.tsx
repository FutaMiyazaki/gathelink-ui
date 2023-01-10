import { zodResolver } from '@hookform/resolvers/zod'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import DialogContent from '@mui/material/DialogContent'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TagsInput } from 'react-tag-input-component'
import { string, z } from 'zod'

import { Alert } from '@/components/Elements/Alert'
import { Button } from '@/components/Elements/Button'
import { Dialog } from '@/components/Elements/Dialog'
import { DialogActions } from '@/components/Elements/Dialog/DialogActions'
import { InputLabel } from '@/components/Elements/Form/InputLabel'
import { usePostFolder } from '@/features/folder/hooks/usePostFolder'

type CreateFolderDialogProps = {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
}

const schema = z.object({
  name: string()
    .min(1, 'フォルダ名は必須です')
    .max(30, 'フォルダ名は30文字以下で入力してください')
    .trim(),
})

type Form = z.infer<typeof schema>

export const CreateFolderDialog: FC<CreateFolderDialogProps> = ({
  isOpenDialog,
  setIsOpenDialog,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Form>({
    resolver: zodResolver(schema),
  })
  const { postFolder, errorMessage, isPosting, resStatus } = usePostFolder()
  const [tags, setTags] = useState<string[]>([])
  const [validationMessage, setValidationMessage] = useState('')

  const onSubmit: SubmitHandler<Form> = (data) => {
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].length > 20) {
        setValidationMessage('タグは20文字以下で入力してください')
        return
      }
    }

    const folder = {
      name: data.name,
      color: '#26a69a',
      tags,
    }
    postFolder(folder)
  }

  useEffect(() => {
    if (resStatus === 201) {
      reset()
      setTags([])
      setValidationMessage('')
      setIsOpenDialog(false)
    }
  }, [resStatus, reset])

  return (
    <Dialog
      isOpenDialog={isOpenDialog}
      setIsOpenDialog={setIsOpenDialog}
      title='フォルダを作成'
      titleIcon={
        <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
          <CreateNewFolderIcon />
        </Avatar>
      }
    >
      <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Alert message={errorMessage} />
          <InputLabel
            labelTitle='フォルダ名'
            inputRequirement='フォルダ名は30文字までです'
            required={true}
            isShowChip={true}
          />
          <TextField
            fullWidth
            size='small'
            type='text'
            placeholder='フォルダ名'
            error={!(errors.name == null)}
            helperText={errors.name != null ? errors.name.message : ''}
            sx={{ mb: 4 }}
            {...register('name')}
          />
          <InputLabel
            labelTitle='タグ名'
            inputRequirement='タグ名は20文字までです'
            required={false}
            isShowChip={true}
          />
          <TagsInput value={tags} onChange={setTags} />
          <FormHelperText error>{validationMessage}</FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button
            size='large'
            color='secondary'
            label='キャンセル'
            onClick={() => setIsOpenDialog(false)}
          />
          <Button
            size='large'
            isLoading={isPosting}
            disabled={isPosting}
            label='作成する'
            type='submit'
          />
        </DialogActions>
      </Box>
    </Dialog>
  )
}
