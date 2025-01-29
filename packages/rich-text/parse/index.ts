import Delta, { type AttributeMap } from 'quill-delta';
import { hasSubObject } from 'remeda';
import { LinkedList, type ListNode } from '../utils/linked-list';

type TypedAttributes = AttributeMap & {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  script?: 'sub' | 'super';
  background?: string;
  color?: string;
  link?: string;
  code?: boolean;
  blockquote?: boolean;
  header?: 1 | 2 | 3 | 4 | 5 | 6;
  list?: 'ordered' | 'bullet' | 'check';
  indent?: number;
  align?: 'center' | 'right' | 'justify';
  direction?: 'rtl';
  font?: string;
  size?: string;
};

type Op = Delta['ops'][0] & {
  attributes?: TypedAttributes;
};

export type Ops = Op[];

export type LineData = {
  delta: Delta;
  attributes: TypedAttributes;
  // sections?: LineData;
  children?: {
    // type: 'text' | 'list' | 'code' | 'blockquote';
    attributes: TypedAttributes;
    data: LineData[];
  };
};

export type SectionData = {
  attributes: TypedAttributes;
  data: LineData[];
  // curLine: ListNode<LineData> | null,
};

// export type SectionData = {

// }

const parseDelta = (delta: Delta, attributes: TypedAttributes) => {};

// const parseSection = (curLine: ListNode<LineData>) => {
//   const { attributes } = curLine.value;

//   if (attributes.indent) {
//     console.log('INDENTED', attributes.indent, curLine, curLine.next);
//     console.log(
//       'RESULT',
//       Object.keys(attributes).length > 0 &&
//         hasSubObject(curLine.next?.value.attributes || {}, attributes)
//     );
//   }
//   const BASE_ATTRS = {
//     ...attributes,
//   };
//   const section: LineData[] = [];
//   while (
//     curLine &&
//     Object.keys(curLine.value.attributes).length > 0 &&
//     hasSubObject(curLine.next?.value.attributes || {}, curLine.value.attributes)
//   ) {
//     section.push(curLine.value);
//     console.log(
//       'DIFFERENCE',
//       hasSubObject(attributes, curLine.next?.value.attributes || {}),
//       attributes,
//       curLine.next?.value.attributes || {},
//       section
//     );

//     if (
//       hasSubObject(
//         curLine.value.attributes,
//         curLine.next?.value.attributes || {}
//       )
//     ) {
//       // console.log('CONTINUE', attributes, curLine.next?.value);

//       curLine = curLine.next!;
//     } else {
//       console.log('CHILD BREAK', attributes, curLine.next?.value);
//       // section[-1].sections = parseSections(curLine.next);
//       const childSections = parseSection(curLine.next!);
//       console.log('CHILD SECTIONS', childSections);
//       const cur = section.pop();
//       if (cur) {
//         console.log('CUR', cur);
//         section.push({ ...cur, children: childSections });
//       }
//       curLine = childSections.curLine;
//     }
//     if (attributes.indent) {
//       console.log('RESULT', section);
//     }
//   }
//   if (section.length === 0) {
//     section.push(curLine.value);
//     curLine = curLine.next!;
//   }

//   return {
//     attributes: BASE_ATTRS,
//     data: section,
//     curLine: curLine,
//   };

//   // curLine = curLine.next;
// };

export const objCompare = <T extends Record<PropertyKey, unknown>>(
  all: T,
  some: any
) => {
  return hasSubObject(some, all as any);
};

// TODO: needs a lot more work
const parseSection = (
  curLine: ListNode<LineData>
): SectionData & {
  curLine: ListNode<LineData> | null;
} => {
  let line: ListNode<LineData> | null = curLine;
  let testVal = true;

  const BASE_ATTRS = {
    ...line.value.attributes,
  };
  const section: SectionData['data'] = [];
  while (line && testVal) {
    const { attributes } = line.value;
    testVal = Object.keys(attributes).length > 0;

    if (line.next && objCompare(attributes, line.next.value.attributes)) {
      // console.log('NEXT OBJ MATCHES AT LEAST A LITTLE');
      section.push(line.value);
      if (objCompare(line.next.value.attributes, attributes)) {
        // console.log("NEXT OBJ DOESN'T MATCH", line, line.next);
      } else {
        // console.log('NEXT OBJ IS CHILD');
        const { curLine, ...rest } = parseSection(line.next);
        const curSection = section.pop();
        if (curSection) {
          section.push({
            ...curSection,
            children: {
              ...rest,
              data: rest.data, // [, ...rest.data]
            },
          });
        }
        // console.log('CHILD SECTION', section, curLine);
        line = curLine;
      }
    } else {
      section.push(line.value);
    }
    line = line?.next || null;
  }
  return {
    attributes: BASE_ATTRS,
    data: section,
    curLine: line,
  };
};

const parseSections = (curLine: ListNode<LineData>): SectionData[] => {
  const sections: {
    // type: 'text' | 'list' | 'code' | 'blockquote';
    attributes: TypedAttributes;
    data: LineData[];
  }[] = [];
  let l: ListNode<LineData> | null = curLine;
  // let curLine = lines.head;
  while (l) {
    const { curLine: nextLine, attributes, data } = parseSection(l);
    sections.push({ attributes, data });
    l = nextLine;
  }
  return sections;
};

// export class Lines {
//   lines: LineData[];
//   lineList: LinkedList<LineData>;
//   constructor(lines: LineData[]) {
//     this.lines = lines;
//     const lineList = new LinkedList<LineData>();
//     lines.forEach((line) => {
//       lineList.append(line);
//     });
//     this.lineList = lineList;
//   }
//   sections() {
//     return parseSections(this.lineList.head!);
//   }
//   map(fn: (line: LineData, index: number) => any) {
//     return this.lines.map(fn);
//   }
// }

export class RichTextParser {
  delta: Delta;

  constructor(opts: Ops) {
    const delta = new Delta(opts);
    this.delta = delta;
    // console.log('DELTA', delta);
    // delta.eachLine((line, attributes, index: number) => {
    //   console.log(line, attributes, index);
    // });
  }
  getHtml() {
    // const quill = new Quill('#editor', {
    //   theme: 'snow',
    // });
    // quill.setContents(this.delta);
    // return quill.getSemanticHTML();
    return '';
  }
  getLines() {
    const lines: LineData[] = [];
    this.delta.eachLine((line, attributes: TypedAttributes, index: number) => {
      lines.push({ delta: line, attributes });
    });

    // const llList = new Lines(lines);
    // console.log(llList);
    // console.log('SECTIONS', llList.sections());

    return lines;
  }
  getSections() {
    const lines = this.getLines();
    const lineList = new LinkedList<LineData>();
    lines.forEach((line) => {
      lineList.append(line);
    });
    if (!lineList.head) {
      return [];
    }
    return parseSections(lineList.head);
  }
}

// export type SectionData = ReturnType<RichTextParser['getSections']>[0];

export { Delta };
