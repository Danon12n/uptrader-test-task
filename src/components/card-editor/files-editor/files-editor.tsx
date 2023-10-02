import { useState } from 'react';
import './files-editor.scss';
import Files from 'react-files';
import { FiX } from '@react-icons/all-files/fi/FiX';
import { boundTodoActions } from '../../../services/redux/action/todos';
import Modal from '../../modal/modal';

type Props = { attachedFiles: string[]; todoNumber: number };

export default function FilesEditor({ attachedFiles, todoNumber }: Props) {
  const [showPicture, setShowPicture] = useState(-1);
  const handleChange = (newFiles) => {
    newFiles.map((file) => {
      boundTodoActions.addAttachedFile(todoNumber, file.preview.url);
    });
  };

  return (
    <div>
      <p>
        <strong>Files Attached:</strong>
      </p>
      <Files
        className='files-dropzone-gallery'
        dragActiveClassName='files-dropzone-active'
        onChange={handleChange}
        accepts={['image/*']}
        multiple
        maxFiles={15}
        clickable={false}
      >
        {attachedFiles.length === 0 && <div>Drop images here</div>}
        {attachedFiles.length > 0 && (
          <div className='files-gallery'>
            {attachedFiles.map((file, index) => (
              <div className='image__container'>
                <img
                  onClick={() => {
                    setShowPicture(index);
                  }}
                  key={index}
                  className='files-gallery-item'
                  src={file}
                />
                <FiX
                  className='closeIcon'
                  onClick={() => {
                    boundTodoActions.deleteAttachedFile(todoNumber, index);
                    console.log('clicck');
                  }}
                  size={25}
                />
              </div>
            ))}
          </div>
        )}
      </Files>
      {showPicture !== -1 && (
        <Modal
          onClose={() => {
            setShowPicture(-1);
          }}
        >
          <img src={attachedFiles[showPicture]} />
        </Modal>
      )}
    </div>
  );
}
