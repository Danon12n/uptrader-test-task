import { useState } from 'react';
import { boundTodoActions } from '../../../services/redux/action/todos';
import { TComment } from '../../../utils/types';
import './comments.scss';
import { FiEdit } from '@react-icons/all-files/fi/FiEdit';
import { FiSave } from '@react-icons/all-files/fi/FiSave';
import { FiTrash } from '@react-icons/all-files/fi/FiTrash';
import SubComments from '../sub-comments/sub-comments';

type Props = { todoNumber: number; comments: TComment[] };

export default function Comments({ todoNumber, comments }: Props) {
  const [editingComment, setEditingComment] = useState(-1);
  const [showSubComments, setshowSubComments] = useState(-1);
  return (
    <div className='comments__container'>
      <h3>Comments:</h3>

      {comments.map((comment, commentIndex) => {
        return (
          <div className='comment'>
            <div className='comment__text'>
              {editingComment === commentIndex ? (
                <input
                  type='text'
                  value={comment.text}
                  onChange={(e) => {
                    boundTodoActions.updateComment(todoNumber, commentIndex, e.target.value);
                  }}
                />
              ) : (
                comment.text
              )}
              <div className='comment__buttons'>
                {editingComment === commentIndex ? (
                  <FiSave
                    onClick={() => {
                      setEditingComment(-1);
                    }}
                    size={25}
                  />
                ) : (
                  <FiEdit
                    onClick={() => {
                      setEditingComment(commentIndex);
                    }}
                    size={25}
                  />
                )}

                <FiTrash
                  onClick={() => {
                    boundTodoActions.deleteComment(todoNumber, commentIndex);
                  }}
                  size={25}
                />
              </div>
            </div>
            <div className='comment__date'>
              <p>{comment.date.toLocaleDateString()}</p>
              {showSubComments !== commentIndex ? (
                <p
                  onClick={() => {
                    setshowSubComments(commentIndex);
                  }}
                >
                  Показать коментарии
                </p>
              ) : (
                <p
                  onClick={() => {
                    setshowSubComments(-1);
                  }}
                >
                  Скрыть коментарии
                </p>
              )}
            </div>
            {showSubComments === commentIndex && (
              <SubComments
                todoNumber={todoNumber}
                subComments={comment.subComments}
                commentIndex={commentIndex}
              />
            )}
          </div>
        );
      })}
      <button
        onClick={() => {
          boundTodoActions.addComment(todoNumber, `${Math.random()}shit`);
        }}
      >
        Add Comment
      </button>
    </div>
  );
}
