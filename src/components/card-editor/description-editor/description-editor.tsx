import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState, MouseEventHandler } from 'react';
import { boundTodoActions } from '../../../services/redux/action/todos';
import TextEditor from '../text-editor/text-editor';
import './description-editor.scss';
import parse from 'html-react-parser';
import Button from '../../ui/button/my-button';

type Props = { todoNumber: number; description: string };

export default function DescriptionEditor({ todoNumber, description }: Props) {
  const editorRef = useRef<Editor>(null);
  const [showDescriptionEditor, setShowDescriptionEditor] = useState(false);

  const editorSave: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (editorRef.current) {
      setShowDescriptionEditor(false);
      // метод getContent есть и работает, но жалуется, что его нет в current
      // @ts-ignore:
      boundTodoActions.changeTodoDescription(todoNumber, editorRef.current.getContent());
    }
  };

  const editorClose: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setShowDescriptionEditor(false);
  };
  return (
    <div
      className='cardEditor__description'
      onClick={(e) => {
        e.stopPropagation();
        setShowDescriptionEditor(true);
      }}
    >
      {showDescriptionEditor ? (
        <>
          <TextEditor editorRef={editorRef} description={description} height={300} />
          <div className='cardEditor__description__buttons'>
            <Button type='secondary' onClick={editorSave}>
              save
            </Button>
            <Button type='secondary' onClick={editorClose}>
              close
            </Button>
          </div>
        </>
      ) : (
        <div className='cardEditor__textEditorPreview'>
          {description ? parse(description) : <p>Press to write desccription...</p>}
        </div>
      )}
    </div>
  );
}
