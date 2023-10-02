import { FiEdit } from '@react-icons/all-files/fi/FiEdit';
import { FiSave } from '@react-icons/all-files/fi/FiSave';
import { FiTrash } from '@react-icons/all-files/fi/FiTrash';
import { boundTodoActions } from '../../../services/redux/action/todos';
import { TSubComment } from '../../../utils/types';
import { useState } from 'react';
import { timeOptions } from '../../../utils/constants';
import './sub-comments.scss';
import Button from '../../ui/button/my-button';

type Props = {
  todoNumber: number;
  commentIndex: number;
  subComments: TSubComment[];
};

export default function SubComments({ todoNumber, commentIndex, subComments }: Props) {
  const [editingSubComment, setEditingSubComment] = useState(-1);
  return (
    <div className='subComment__container'>
      {subComments.map((subComment, subCommentIndex) => {
        return (
          <div className='subComment'>
            <div className='subComment__text'>
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
              <div className='subComment__buttons'>
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
            <div className='subComment__date'>
              {new Date(subComment.date).toLocaleDateString([], timeOptions)}
            </div>
          </div>
        );
      })}
      <Button
        type='secondary'
        onClick={() => {
          boundTodoActions.addSubComment(todoNumber, commentIndex, '');
        }}
      >
        Add Comment
      </Button>
    </div>
  );
}
