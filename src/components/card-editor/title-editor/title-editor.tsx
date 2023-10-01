import { FiEdit } from '@react-icons/all-files/fi/FiEdit';
import { FiSave } from '@react-icons/all-files/fi/FiSave';
import { ChangeEventHandler, useState } from 'react';
import { boundTodoActions } from '../../../services/redux/action/todos';
import './title-editor.scss';

type Props = { todoNumber: number; todoTitle: string };

export default function TitleEditor({ todoNumber, todoTitle }: Props) {
  const [showTitleEditor, setShowTitleEditor] = useState(false);
  const [title, setTitle] = useState(todoTitle);

  const onTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onTitleSave = () => {
    boundTodoActions.changeTodoTitle(todoNumber, title);
    setShowTitleEditor(!showTitleEditor);
  };

  const onTitleEdit = () => {
    setShowTitleEditor(!showTitleEditor);
  };
  return (
    <div className='cardEditor__title'>
      {showTitleEditor ? (
        <>
          <input type='text' value={title} onChange={onTitleChange} />
          <FiSave size={25} onClick={onTitleSave} />
        </>
      ) : (
        <>
          <h1>{todoTitle}</h1>
          <FiEdit size={25} onClick={onTitleEdit} />
        </>
      )}
    </div>
  );
}
