'use client';
import 'quill/dist/quill.snow.css';
import { type RefObject, useEffect, useRef, useState } from 'react';
import './styles.css';
import type { Quill, QuillOptions } from './types';
export * from './parse';

// REFERENCE https://www.npmjs.com/package/react-quilljs
// USEFUL FOR ADDING IMAGE HANDLER

declare global {
  interface Window {
    hljs: any;
  }
}

const theme = 'snow';

type ToolbarTypes = (
  | string
  | { [key: string]: string | (string | number | boolean)[] }
)[][];

type ModuleTypes = {
  toolbar: ToolbarTypes;
  clipboard?: {
    matchVisual: boolean;
  };
};
export const modules: ModuleTypes = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      //  { list: 'check' }
    ],
    [{ color: [false, 'gray'] }],
    // [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }],
    [
      'link',
      'image',
      // 'video'
    ],

    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

export const DEFAULT_FORMATS = [
  'blockquote',
  'code-block',
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'list',
  'indent',
  'header',
  'link',
  'image',
  'color',
  // 'video',
];

function assign(target: any, _varArgs: any) {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const to: any = new Object(target);

  for (let index = 1; index < arguments.length; index++) {
    const nextSource = arguments[index];

    if (nextSource !== null && nextSource !== undefined) {
      for (const nextKey in nextSource) {
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
}

export const includeModuleFormats = (
  modules?: ModuleTypes,
  formats: string[] = DEFAULT_FORMATS
) => {
  const newFormats = new Set([...(formats || [])]);
  const toolbar = modules?.toolbar;
  if (!toolbar) {
    return formats;
  }
  toolbar.forEach((section) => {
    section.forEach((button) => {
      if (typeof button === 'object') {
        const [format] = Object.keys(button);
        if (format) {
          newFormats.add(format);
        }
      }
      if (typeof button === 'string') {
        newFormats.add(button);
      }
    });
  });
  newFormats.delete('clean');
  return Array.from(newFormats);
};

/**
 *
 * @param options Quill static options. https://github.com/gtgalone/react-quilljs#options
 * @returns Returns quill, quillRef, and Quill. https://github.com/gtgalone/react-quilljs#return
 */
export const useQuill = (
  options: QuillOptions | undefined = {
    theme,
    modules,
    formats: DEFAULT_FORMATS,
  }
) => {
  const quillRef: RefObject<any> = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [obj, setObj] = useState({
    Quill: undefined as any | undefined,
    quillRef,
    quill: undefined as Quill | undefined,
    editorRef: quillRef,
    editor: undefined as Quill | undefined,
  });

  useEffect(() => {
    if (!obj.Quill) {
      setObj((prev) => assign(prev, { Quill: require('quill').default }));
    }
    const mods = assign(modules, options.modules);
    if (obj.Quill && !obj.quill && quillRef && quillRef.current && isLoaded) {
      if (window.hljs) {
        // window.hljs.configure({
        //   cssSelector: '.ql-code-block',
        // });
        // window.hljs.highlightAll();
      } else {
        mods.syntax = false;
      }

      const opts = assign(options, {
        modules: mods,
        formats: includeModuleFormats(mods, options.formats || []),
        theme: options.theme || theme,
      });

      const quill = new obj.Quill(quillRef.current, opts);

      setObj(assign(assign({}, obj), { quill, editor: quill }));
    }
    setIsLoaded(true);
  }, [isLoaded, obj, options]);

  return obj;
};
