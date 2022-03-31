import React, {FC} from 'react';
import EditorJs from 'react-editor-js';
const Header = require('@editorjs/header');
const Paragraph = require('@editorjs/paragraph');

interface IRedactor{
  refRedactor: any,
  classes?: string,
}

const Redactor: FC<IRedactor> = ({ refRedactor, classes }) => {
  const data = {
    blocks: [
      {
        type: "header",
        data: {
          text: "",
          level: 2
        }
      },
      {
        type: "paragraph",
        data: {
          text: "" ,
          level: 4,
        },
      },
    ],
  }

  const tools = {
    header: {
      class: Header,
      config: {
        placeholder: 'Заголовок',
        levels: [2, 3, 4],
        defaultLevel: 2
      },
      inlineToolbar: true
    },
    paragraph: {
      class: Paragraph,
      config: {
        placeholder: '.'
      },
      inlineToolbar: true
    },
  }

  return (
    <div className={`${classes ? classes : ''}`}>
      <EditorJs
        ref={refRedactor}
        data={data}
        tools={tools}
        hideToolbar={true}
      />
    </div>
  );
}

export default Redactor;