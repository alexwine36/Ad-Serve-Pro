import { type Ops, RichTextParser, objCompare } from '.';

const UlData: Ops = [
  {
    insert: '0.1',
  },
  {
    attributes: {
      list: 'bullet',
    },
    insert: '\n',
  },
  {
    insert: '1.1',
  },
  {
    attributes: {
      indent: 1,
      list: 'bullet',
    },
    insert: '\n',
  },
  {
    insert: '1.2',
  },
  {
    attributes: {
      indent: 1,
      list: 'bullet',
    },
    insert: '\n',
  },
];

describe('Obj Compare', () => {
  test('should compare objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1, b: 2 };
    // expect(obj1).toEqual(obj2);
    expect(objCompare(obj1, obj2)).toBe(true);
    expect(objCompare(obj2, obj1)).toBe(false);
  });
});

describe('Parse', () => {
  test('should parse nested lists', () => {
    const parser = new RichTextParser(UlData);
    expect(parser.getLines().length).toBe(3);
    const sections = parser.getSections();
    expect(sections.length).toBe(1);
    console.log(JSON.stringify(sections, null, 2));
    expect(sections[0].data.length).toBe(1);
  });
});
