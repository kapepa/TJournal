import React, {FC} from 'react';
import EditorJs from 'react-editor-js';
import {API} from "@editorjs/editorjs";
const Header = require('@editorjs/header');
const Paragraph = require('@editorjs/paragraph');
const ImageTool = require('@editorjs/image');

interface IRedactor{
  classes?: string,
  cb: (data: { title: string; text: string }) => void,
  picture: (image: File) => Promise<any>,
}

interface IEditor {
  type: string,
  data: any
}

const Redactor: FC<IRedactor> = ({ classes, cb, picture }) => {
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
    image: {
      class: ImageTool,
      config: {
        uploader: {
           uploadByFile(file: File) {
            return  picture(file).then((url: string) => {
              return {
                success: 1,
                file: { url }
              }
            })
          }
        }
      }
    },
  }

  return (
    <div className={`${classes ? classes : ''}`}>
      <EditorJs
        data={data}
        tools={tools}
        hideToolbar={true}
        onChange={(api: API, data: any): void => {
          const content = data.blocks?.reduce((accum: {title: string, text: string} , el: IEditor) => {
            if(el.type === 'header' && el.data.text) accum.title = el.data.text;
            if(el.type === 'paragraph' && el.data.text) accum.text = el.data.text;
            return accum
          }, {} as {title: string, text: string});
          cb(content);
        }}
      />
    </div>
  );
}

export default Redactor;