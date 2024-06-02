import EditorJS, { OutputData } from '@editorjs/editorjs';
import { useEffect, useRef } from 'react';
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
function Editorjs({onChange}:EditorProps) {
    const ejInstance : any = useRef();

    const initEditor = () =>{
        const editor = new EditorJS({
            holder : "editorjs",
            placeholder : "Write Something, or press '/ ' for commands...",
            onReady : ()=>{
                ejInstance.current = editor;
            },
            data : JSON.parse(localStorage.getItem('editorData') || "{}") || {},
            onChange : async ()=>{
                let editorData = await editor.saver.save();
                console.log(editorData)
                onChange(editorData);
            },

            tools : {
                header: {
                    class: Header,
                    config: {
                      levels: [1, 2, 3,4],
                      defaultLevel: 3,
                      allowAnchor: true,
                      anchorLength: 200,
                    },
                 },
                  list: List,
                  delimiter: Delimiter,
                  alert : Alert,
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
                      showLocaleOption: true, // enable locale case options
                      locale: 'tr' // or ['tr', 'TR', 'tr-TR']
                    }
                  },
            },
        });
    }

    useEffect(()=>{
        if(ejInstance.current === null){
            initEditor();
        }

        return ()=>{
            ejInstance?.current?.destroy();
            ejInstance.current = null
        }
    },[])

    

    
  return (
    <>
    <div id = "editorjs" className='pt-6'></div>
    </>
  )
}

export default Editorjs;