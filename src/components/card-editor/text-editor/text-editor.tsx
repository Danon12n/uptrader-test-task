import { Editor } from '@tinymce/tinymce-react';
import React from 'react';

type Props = {
  editorRef: React.LegacyRef<Editor>;
  description: string;
  height: number | string;
};

export default function TextEditor({ editorRef, description, height = 300 }: Props) {
  if (!editorRef) return <></>;
  return (
    <Editor
      ref={editorRef}
      apiKey='14k18heez374wca5377x8d32unel6rxtitgd73s1efec5e3n'
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={`${description ? description : 'I need to do...'}`}
      init={{
        height: height,
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist | ',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
}
