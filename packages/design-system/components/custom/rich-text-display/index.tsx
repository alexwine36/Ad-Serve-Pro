'use client';

import {
  type LineData,
  type Ops,
  RichTextParser,
  type SectionData,
} from '@repo/rich-text';
import type React from 'react';
import { cn } from '../../../lib/utils';
import { List } from '../../ui/list';
import { Heading, Text } from '../typography';

export type RichTextDisplayProps = {
  //   lines: LineData[];
  ops: Ops;
};

// const getTag = (line: LineData) => {
//     switch (key) {
//         case value:

//             break;

//         default:
//             break;
//     }
// }

const WrappedComponent: React.FC<{
  wrappers: React.ComponentType[];
  children: React.ReactNode;
  className?: string;
}> = ({ wrappers, children, className }) => {
  if (!wrappers || wrappers.length === 0) {
    if (className) {
      return <span className={className}>{children}</span>;
    }
    return children;
  }

  // Apply wrappers from the inside out
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return wrappers.reduceRight((wrappedChild, Wrapper: any, i) => {
    return (
      <Wrapper className={className} key={`wrapper-${i}`}>
        {wrappedChild}
      </Wrapper>
    );
  }, children);
};

const OpDisplay = ({ op }: { op: Ops[0] }) => {
  let value = '';
  if (typeof op.insert === 'string') {
    value = op.insert;
  }
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const wrappers: any[] = [];
  const classNames: string[] = [];
  //   let Comp: any = 'span';
  if (op.attributes?.bold) {
    wrappers.push('b');
  }
  if (op.attributes?.underline) {
    wrappers.push('u');
  }
  if (op.attributes?.italic) {
    wrappers.push('i');
  }
  if (op.attributes?.strike) {
    wrappers.push('s');
  }
  if (op.attributes?.color === 'gray') {
    classNames.push('text-muted-foreground');
  }

  return (
    <WrappedComponent className={cn(classNames)} wrappers={wrappers}>
      {value}
    </WrappedComponent>
  );
};

const RichTextAttributeDisplay = ({
  ops,
}: {
  ops: Ops;
}) => {
  return (
    <>
      {ops.map((o) => {
        return <OpDisplay key={JSON.stringify(o)} op={o} />;
      })}
    </>
  );
};

const RichTextComponent = ({ line }: { line: LineData; child?: boolean }) => {
  const { delta, attributes } = line;
  if (attributes.header) {
    return (
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      <Heading level={attributes.header as any}>
        <RichTextAttributeDisplay ops={delta.ops} />
      </Heading>
    );
  }
  if (attributes.list) {
    return (
      <li>
        <RichTextAttributeDisplay ops={delta.ops} />
      </li>
    );
  }
  return (
    <Text>
      <RichTextAttributeDisplay ops={delta.ops} />
    </Text>
  );
};

const SectionDataComponent = ({ item }: { item: SectionData['data'][0] }) => {
  return (
    <>
      <RichTextComponent line={item} />
      {item.children && <SectionsComponent section={item.children} />}
    </>
  );
};

const SectionsComponent = ({ section }: { section: SectionData }) => {
  //   console.log(section);
  if (section.attributes.list) {
    return (
      <List
        variant={section.attributes.list}
        className="ps-5"
        // className="max-w-md list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400"
      >
        {section.data.map((section, idx) => (
          <SectionDataComponent key={`section-${idx}`} item={section} />
        ))}
      </List>
    );
  }
  return (
    <>
      {section.data.map((section, idx) => (
        <SectionDataComponent key={`section-${idx}`} item={section} />
      ))}
    </>
  );
};

export const RichTextDisplay: React.FC<RichTextDisplayProps> = ({ ops }) => {
  const sections = new RichTextParser(ops).getSections();
  // console.log(sections, ops);
  //   console.log('SECTIONS', sections);
  return (
    <div>
      {sections.map((section, idx) => {
        return <SectionsComponent key={`section-${idx}`} section={section} />;
      })}
    </div>
  );
};
// (
//         <RichTextComponent key={`line-${idx}`} line={line} />
//       )
