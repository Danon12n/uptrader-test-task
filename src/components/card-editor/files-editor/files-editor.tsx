import './files-editor.scss';
import Files from 'react-files';

type Props = { attachedFiles: []; todoNumber: number };

export default function FilesEditor({ attachedFiles, todoNumber }: Props) {
  const handleChange = (files) => {
    console.log(files);
    localStorage.setItem('file1', files[0].toString());
  };

  const handleError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message);
  };

  return (
    <div>
      <p>
        Files Attached:
        {attachedFiles ? attachedFiles : 'no files attached'}{' '}
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
    </div>
  );
}
