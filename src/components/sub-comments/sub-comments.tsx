import { FiEdit } from '@react-icons/all-files/fi/FiEdit';
import { FiSave } from '@react-icons/all-files/fi/FiSave';
import { FiTrash } from '@react-icons/all-files/fi/FiTrash';
import { boundTodoActions } from '../../services/redux/action/todos';
import { TSubComment } from '../../utils/types';
import { useState } from 'react';

type Props = {
  todoNumber: number;
  commentIndex: number;
  subComments: TSubComment[];
};

export default function SubComments({ todoNumber, commentIndex, subComments }: Props) {
  const [editingSubComment, setEditingSubComment] = useState(-1);
  return (
    <div>
      {subComments.map((subComment, subCommentIndex) => {
        return (
          <div className='comment'>
            <div className='comment__text'>
              {editingSubComment === commentIndex ? (
                <input
                  type='text'
                  value={subComment.text}
                  onChange={(e) => {
                    boundTodoActions.updateSubComment(
                      todoNumber,
                      commentIndex,
                      subCommentIndex,
                      e.target.value
                    );
                  }}
                />
              ) : (
                subComment.text
              )}
              <div className='comment__buttons'>
                {editingSubComment === commentIndex ? (
                  <FiSave
                    onClick={() => {
                      setEditingSubComment(-1);
                    }}
                    size={25}
                  />
                ) : (
                  <FiEdit
                    onClick={() => {
                      setEditingSubComment(commentIndex);
                    }}
                    size={25}
                  />
                )}

                <FiTrash
                  onClick={() => {
                    boundTodoActions.deleteSubComment(todoNumber, commentIndex, subCommentIndex);
                  }}
                  size={25}
                />
              </div>
            </div>
            <div className='comment__date'>{subComment.date.toLocaleDateString()}</div>
          </div>
        );
      })}
      <button
        onClick={() => {
          boundTodoActions.addSubComment(todoNumber, commentIndex, `${Math.random()}shit`);
        }}
      >
        Add Comment
      </button>
    </div>
  );
}
