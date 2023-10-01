import { useParams } from 'react-router';
import './card-editor.scss';
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';
import { TStore } from '../../services/redux/reducers';
import { TTodosState } from '../../services/redux/reducers/todos';
import { boundTodoActions } from '../../services/redux/action/todos';
import parse from 'html-react-parser';
import TextEditor from '../text-editor/text-editor';
import { TTodoCard } from '../../utils/types';
import { FiEdit } from '@react-icons/all-files/fi/FiEdit';
import { FiSave } from '@react-icons/all-files/fi/FiSave';
import SubTodos from '../sub-todos/sub-todos';
import Comments from '../comments/comments';
// import Files from 'react-files';

type Props = {};

export default function CardEditor({}: Props) {
  const { number } = useParams();
  if (!number) return <>Card Number wasn't found</>;

  const { todos } = useSelector<TStore, TTodosState>((state) => state.todos);
  const currentTodo: TTodoCard = { ...todos.find((todo) => todo.number === +number) } as TTodoCard;

  if (!currentTodo) return <h1>Todo wasnt found!</h1>;

  const editorRef = useRef<Editor>(null);
  const [showDescriptionEditor, setShowDescriptionEditor] = useState(false);
  const [showTitleEditor, setShowTitleEditor] = useState(false);
  const [title, setTitle] = useState(currentTodo.title);

  const getWorkTime = () => {
    return (new Date() - currentTodo.creationDate) / (60 * 60 * 24 * 1000);
  };

  const onTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onTitleSave = () => {
    currentTodo.title = title;
    boundTodoActions.updateTodo(currentTodo.number, currentTodo);
    setShowTitleEditor(!showTitleEditor);
  };

  const onTitleEdit = () => {
    setShowTitleEditor(!showTitleEditor);
  };

  const editorSave: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (editorRef.current) {
      currentTodo.description = editorRef.current.getContent();
      setShowDescriptionEditor(false);
      boundTodoActions.updateTodo(currentTodo.number, currentTodo);
    }
  };

  const editorClose: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setShowDescriptionEditor(false);
  };

  // const handleChange = (files) => {
  //   console.log(files);
  //   localStorage.setItem('file1', files[0].toString());
  // };

  // const handleError = (error, file) => {
  //   console.log('error code ' + error.code + ': ' + error.message);
  // };

  return (
    <div className='cardEditor__container'>
      <div className='cardEditor__title'>
        {showTitleEditor ? (
          <>
            <input type='text' value={title} onChange={onTitleChange} />
            <FiSave size={25} onClick={onTitleSave} />
          </>
        ) : (
          <>
            <h1>{currentTodo.title}</h1>
            <FiEdit size={25} onClick={onTitleEdit} />
          </>
        )}
      </div>
      <p className='cardEditor__subtitle'>in {currentTodo.status}</p>
      <div
        className='cardEditor__description'
        onClick={(e) => {
          e.stopPropagation();
          setShowDescriptionEditor(true);
        }}
      >
        {showDescriptionEditor ? (
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
      <p>Priority: {currentTodo.priority}</p>
      <p>Creation Date: {currentTodo.creationDate.toLocaleDateString()}</p>
      <p>Time in work: {`${Math.floor(getWorkTime())} days`}</p>
      {/* <div>
        <p>
          Files Attached:{' '}
          {currentTodo.attachedFiles ? currentTodo.attachedFiles : 'no files attached'}{' '}
        </p>
        <Files
          onChange={handleChange}
          onError={handleError}
          accepts={['image/png', '.pdf', 'audio/*', '.txt', '.jpg']}
          multiple
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click to upload
        </Files>
        <button
          onClick={() => {
            const file = localStorage.getItem('file1');
            console.log(file);
          }}
        >
          get file
        </button>
      </div> */}
      <SubTodos todoNumber={currentTodo.number} subtodos={currentTodo.subTodos} />
      <Comments todoNumber={currentTodo.number} comments={currentTodo.comments} />
    </div>
  );
}
