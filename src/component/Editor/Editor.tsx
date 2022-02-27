import React, { useCallback, useMemo } from 'react'
import ReactQuill from 'react-quill'
import { uploadThumbnailApi } from '../../api/book/book'
import { IEditor } from './interface'

const Editor: React.FC<IEditor> = ({ contentText, setContentText }) => {
  let quillReact: ReactQuill
  const imageHandler = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      if (input.files) {
        let file = input.files[0]
        let formData = new FormData()
        formData.append('upload', file)
        const res = await uploadThumbnailApi(formData)
        if (quillReact) {
          const range = quillReact.getEditor().getSelection()
          if (range) {
            quillReact.getEditor().insertEmbed(Number(range.index), 'image', res)
          }
        }
      }
    }
  }, [])

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['clean', 'image']
        ],
        handlers: {
          image: imageHandler
        },
        imageResize: true
      },
      clipboard: {
        matchVisual: true
      }
    }
  }, [imageHandler])

  return (
    <ReactQuill
      ref={(el: ReactQuill) => {
        quillReact = el
      }}
      value={contentText}
      onChange={setContentText}
      theme="snow"
      modules={modules}
    />
  )
}

export default Editor
