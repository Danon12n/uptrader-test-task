import { useParams } from 'react-router';
import './card-editor.scss';
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';
import { TStore } from '../../services/redux/reducers';
import { TTodosState } from '../../services/redux/reducers/todos';
import { boundTodoActions } from '../../services/redux/action/todos';
import parse from 'html-react-parser';
import TextEditor from './text-editor/text-editor';
import { TTodoCard } from '../../utils/types';

import SubTodos from './sub-todos/sub-todos';
import Comments from './comments/comments';
import PriorityEditor from './priority-editor/priority-editor';
import TitleEditor from './title-editor/title-editor';
import DescriptionEditor from './description-editor/description-editor';
// import Files from 'react-files';

type Props = {};

export default function CardEditor({}: Props) {
  const { number } = useParams();
  if (!number) return <>Card Number wasn't found</>;

  const { todos } = useSelector<TStore, TTodosState>((state) => state.todos);
  const currentTodo: TTodoCard = { ...todos.find((todo) => todo.number === +number) } as TTodoCard;

  if (!currentTodo) return <h1>Todo wasnt found!</h1>;

  const getWorkTime = () => {
    return (new Date() - currentTodo.creationDate) / (60 * 60 * 24 * 1000);
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
      <TitleEditor todoNumber={currentTodo.number} todoTitle={currentTodo.title} />
      <p className='cardEditor__subtitle'>in {currentTodo.status}</p>
      <DescriptionEditor todoNumber={currentTodo.number} description={currentTodo.description} />

      <PriorityEditor priority={currentTodo.priority} todoNumber={currentTodo.number} />
      <p>
        <strong>Creation Date:</strong> {currentTodo.creationDate.toLocaleDateString()}
      </p>
      <p>
        <strong>Time in work:</strong> {`${Math.floor(getWorkTime())} days`}
      </p>
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
