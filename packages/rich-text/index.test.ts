import {
  DEFAULT_FORMATS,
  modules as DEFAULT_MODULES,
  includeModuleFormats,
} from '.';

describe('Use Quill', () => {
  test('should work with defaults', () => {
    const res = includeModuleFormats(DEFAULT_MODULES);

    expect(res).toEqual(expect.arrayContaining(DEFAULT_FORMATS));
    expect(res?.length).toEqual(DEFAULT_FORMATS.length);
  });
  test('should keep added formats', () => {
    const newFormats = ['new-format'];
    const res = includeModuleFormats(DEFAULT_MODULES, newFormats);

    expect(res).toEqual(expect.arrayContaining(newFormats));
    expect(res).toEqual(
      expect.arrayContaining([...newFormats, ...DEFAULT_FORMATS])
    );
    // expect(res?.length).toEqual(DEFAULT_FORMATS.length + newFormats.length);
  });

  test('should add formats from toolbar', () => {
    const newToolbarOpts = ['blockquote', 'code-block'];
    const res = includeModuleFormats({
      ...DEFAULT_MODULES,
      toolbar: [...DEFAULT_MODULES.toolbar, newToolbarOpts],
    });

    expect(res).toEqual(
      expect.arrayContaining([...newToolbarOpts, ...DEFAULT_FORMATS])
    );
    // expect(res?.length).toEqual(DEFAULT_FORMATS.length + newFormats.length);
  });
});
