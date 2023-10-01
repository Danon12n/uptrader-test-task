import { useParams } from 'react-router';
import './card-editor.scss';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';
import { TStore } from '../../services/redux/reducers';
import { TTodosState } from '../../services/redux/reducers/todos';
import { boundTodoActions } from '../../services/redux/action/todos';
import parse from 'html-react-parser';
import TextEditor from '../text-editor/text-editor';
import { TTodoCard } from '../../utils/types';

type Props = {};

export default function CardEditor({}: Props) {
  const { number } = useParams();
  if (!number) return <>Card Number wasn't found</>;

  const { todos } = useSelector<TStore, TTodosState>((state) => state.todos);
  const currentTodo: TTodoCard = { ...todos.find((todo) => todo.number === +number) } as TTodoCard;

  if (!currentTodo) return <h1>Todo wasnt found!</h1>;

  const editorRef = useRef<Editor>(null);
  const [showEditor, setShowEditor] = useState(false);

  const editorSave: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (editorRef.current) {
      currentTodo.description = editorRef.current.getContent();
      setShowEditor(false);
      boundTodoActions.updateTodo(currentTodo.number, currentTodo);
    }
  };

  const editorClose: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setShowEditor(false);
  };

  return (
    <div className='cardEditor__container'>
      <div className='cardEditor__title'>
        <h1>{currentTodo.title}</h1>
        <p>in {currentTodo.status}</p>
      </div>
      <div
        className='cardEditor__description'
        onClick={(e) => {
          e.stopPropagation();
          setShowEditor(true);
        }}
      >
        {showEditor ? (
          <>
            <TextEditor editorRef={editorRef} currentTodo={currentTodo} height={300} />
            <div>
              <button onClick={editorSave}>Сохранить</button>
              <button onClick={editorClose}>Закрыть</button>
            </div>
          </>
        ) : (
          <div className='cardEditor__textEditorPreview'>
            {currentTodo.description ? (
              parse(currentTodo.description)
            ) : (
              <p>Нажмите, чтобы написать описание задачи...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
