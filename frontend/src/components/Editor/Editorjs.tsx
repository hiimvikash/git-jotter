import { useEffect, useRef, useCallback } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import "./ejs.css"

import Header from "@editorjs/header";
import List from "@editorjs/list";
import Delimiter from "@editorjs/delimiter";
import Alert from 'editorjs-alert';
import Checklist from '@editorjs/checklist'
import Table from '@editorjs/table'
import CodeTool from '@editorjs/code';
import ChangeCase from 'editorjs-change-case';
import ToggleBlock from 'editorjs-toggle-block';

interface EditorProps {
  onChange: (data: OutputData) => void;
}

function Editorjs({ onChange }: EditorProps) {
  const ejInstance = useRef<EditorJS | null>(null);

  const initEditor = useCallback(() => {
    if (ejInstance.current) {
      return;
    }

    const editor = new EditorJS({
      holder: 'editorjs',
      placeholder: 'Write Something, or press "/ " for commands...',
      onReady: () => {
        ejInstance.current = editor;
      },
      data: JSON.parse(localStorage.getItem('editorData') || '{}') || {},
      onChange: async () => {
        const editorData = await editor.saver.save();
        console.log(editorData);
        onChange(editorData);
      },
      tools: {
        header: {
          class: Header,
          config: {
            levels: [1, 2, 3, 4],
            defaultLevel: 3,
            allowAnchor: true,
            anchorLength: 200,
          },
        },
        list: List,
        delimiter: Delimiter,
        alert: Alert,
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        table: Table,
        code: CodeTool,
        toggle: {
          class: ToggleBlock,
          inlineToolbar: true,
        },
        changeCase: {
          class: ChangeCase,
          config: {
            showLocaleOption: true,
            locale: 'tr', // or ['tr', 'TR', 'tr-TR']
          },
        },
      },
    });
  }, [onChange]);

  useEffect(() => {
    if(ejInstance.current === null){
      initEditor();
  }


    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  },[]);

  return (
    <div>
      <div id="editorjs" className="pt-6"></div>
    </div>
  );
}

export default Editorjs;
