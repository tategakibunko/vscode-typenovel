export interface BuiltinSignature {
  label: string;
  doc?: string;
  params: { label: string, doc?: string }[];
}

export const BLOCK_SYMBOL = '@';
export const ANNOT_SYMBOL = '$';

export const BuiltinBlockSignatures: { [key: string]: BuiltinSignature } = {
  '@scene': {
    label: '@scene(constraints)',
    doc: [
      'Create scene block.',
      '### example',
      '```typescript',
      '@scene({',
      '  season: "summer"',
      '}){',
      '  text',
      '}',
      '```',
    ].join('\n'),
    params: [
      { label: 'constraints', doc: 'constraints for @scene block' }
    ]
  },
  '@p': {
    label: '@p()',
    doc: [
      'Create paragraph. Note that `@p` adds some space after block.',
      'If you don\'nt want to add space after, you should use `@line` instead.',
      '### example',
      '```',
      '@p(){ paragraph text here }',
      '```',
    ].join('\n'),
    params: []
  },
  '@line': {
    label: '@line()',
    doc: [
      'Create paragraph. Note that `@line` did\'t add space after block.',
      'If you want to add some space after block, you should use `@p` instead.',
      '### example',
      '```',
      '@line(){ paragraph text here }',
      '```',
    ].join('\n'),
    params: []
  },
  '@pre': {
    label: '@pre()',
    doc: [
      'Create pre block(white-space:"pre" in css).',
      'In `@pre` block, all spaces and line-breaks remain.',
      '### example',
      '```',
      '@pre() { pre text here }',
      '```',
    ].join('\n'),
    params: []
  },
  '@h1': {
    label: '@h1()',
    doc: [
      'Create header level 1.',
      '### example',
      '```',
      '@h1() { some text here }',
      '```',
    ].join('\n'),
    params: []
  },
  '@h2': {
    label: '@h2()',
    doc: [
      'Create header level 2.',
      '### example',
      '```',
      '@h2() { some text here }',
      '```',
    ].join('\n'),
    params: []
  },
  '@h3': {
    label: '@h3()',
    doc: [
      'Create header level 3.',
      '### example',
      '```',
      '@h3() { some text here }',
      '```',
    ].join('\n'),
    params: []
  },
  '@h4': {
    label: '@h4()',
    doc: [
      'Create header level 4.',
      '### example',
      '```',
      '@h4() { some text here }',
      '```',
    ].join('\n'),
    params: []
  },
  '@h5': {
    label: '@h5()',
    doc: [
      'Create header level 5.',
      '### example',
      '```',
      '@h5() { some text here }',
      '```',
    ].join('\n'),
    params: []
  },
  '@h6': {
    label: '@h6()',
    doc: [
      'Create header level 6.',
      '### example',
      '```',
      '@h6() { some text here }',
      '```',
    ].join('\n'),
    params: []
  },
  '@dropcaps': {
    label: '@dropcaps()',
    doc: [
      'Create dropcaps paragraph.',
      '### example',
      '```',
      '@dropcaps(){ This is the most interesting story I\'ve ever heard! }',
      '```',
    ].join('\n'),
    params: []
  },
  '@speak': {
    label: '@speak(character-key)',
    doc: [
      'Create speech text.',
      'Note that `character-key` is assumed to be defined in `data.json` in your project root.',
      '### example',
      '```typescript',
      '@speak("john"){ speech text here }',
      '```',
    ].join('\n'),
    params: [
      { label: 'character-key', doc: 'key string of character.' }
    ]
  },
  '@sb-start': {
    label: '@sb-start(character-key, image-key)',
    doc: [
      'Create speech bubble text with character image.',
      'Character image is displayed at **start** position along inline.',
      'Note that `character-key` and `image-key` is assumed to be defined in `data.json` in your project root.',
      '### example',
      '```typescript',
      '@sb-start("john", "normal"){ speech text here }',
      '@sb-start("john", "smile"){ speech text here }',
      '```',
    ].join('\n'),
    params: [
      { label: 'character-key', doc: 'key string of character.' },
      { label: 'image-key', doc: 'image key string of character.' },
    ]
  },
  '@sb-end': {
    label: '@sb-end(character-key, image-key)',
    doc: [
      'Create speech bubble text with character image.',
      'Character image is displayed at **end** position along inline.',
      'Note that `character-key` and `image-key` is assumed to be defined in `data.json` in your project root.',
      '### example',
      '```typescript',
      '@sb-end("john", "normal"){ speech text here }',
      '@sb-end("john", "smile"){ speech text here }',
      '```',
    ].join('\n'),
    params: [
      { label: 'character-key', doc: 'key string of character.' },
      { label: 'image-key', doc: 'image key string of character.' },
    ]
  },
  '@tip': {
    label: '@tip(title)',
    doc: [
      'Create tip link.',
      '### example',
      '```typescript',
      'I love @tip("Messi"){ Best football player ever }.',
      '```',
    ].join('\n'),
    params: [
      { label: 'title', doc: 'title for tip link' }
    ]
  },
  '@notes': {
    label: '@notes()',
    doc: [
      'Create notes icon.',
      '### example',
      '```',
      'IMO @notes(){ In My Opinion }, this is great.',
      '```',
    ].join('\n'),
    params: [
    ]
  },
};

export const BuiltinAnnotSignatures: { [key: string]: BuiltinSignature } = {
  '$a': {
    label: '$a(text, url)',
    doc: [
      'Insert link text.',
      '### example',
      '```typescript',
      'Search by $a("google", "https://google.com").',
      '```',
    ].join('\n'),
    params: [
      { label: 'text', doc: 'link text.' },
      { label: 'url', doc: 'link url' },
    ]
  },
  '$b': {
    label: '$b(text)',
    doc: [
      'Bold text.',
      '### example',
      '```typescript',
      'This is $b("important").',
      '```',
    ].join('\n'),
    params: [
      { label: 'text', doc: 'bold text.' },
    ]
  },
  '$img': {
    label: '$img(src, width, height)',
    doc: [
      'Insert image.',
      '### example',
      '```typescript',
      '$img("path/to/image.png", 300, 400).',
      '```',
    ].join('\n'),
    params: [
      { label: 'src', doc: 'image src.' },
      { label: 'width', doc: 'image width.' },
      { label: 'height', doc: 'image height.' },
    ]
  },
  '$include': {
    label: '$include(filepath)',
    doc: [
      'Include external TypeNovel source at this position.',
      '### example',
      '```typescript',
      '@scene({season:"winter"}){ $include("files/prologue.tn") }',
      '@scene({season:"spring"}){ $include("files/chapter1.tn") }',
      '```',
    ].join('\n'),
    params: [
      { label: 'filepath', doc: 'filepath of external TypeNovel source.' },
    ]
  },
  '$fdot': {
    label: '$fdot(text)',
    doc: [
      'Add bouten(傍点) of filled dot(\u2022) to the text.',
      'In css, it\'s equivalent to `text-emphasis:filled dot`.',
      '### example',
      '```typescript',
      'これは$fdot("重要")なことです。',
      '```',
    ].join('\n'),
    params: [
      { label: 'text', doc: 'target text.' },
    ]
  },
  '$odot': {
    label: '$odot(text)',
    doc: [
      'Add bouten(傍点) of open dot(\u25E6) to the text.',
      'In css, it\'s equivalent to `text-emphasis:open dot`.',
      '### example',
      '```typescript',
      'これは$odot("重要")なことです。',
      '```',
    ].join('\n'),
    params: [
      { label: 'text', doc: 'target text.' },
    ]
  },
  '$ftriangle': {
    label: '$ftriangle(text)',
    doc: [
      'Add bouten(傍点）of filled triangle(\u25B2) to the text.',
      'In css, it\'s equivalent to `text-emphasis:filled triangle`.',
      '### example',
      '```typescript',
      'これは$ftriangle("重要")なことです。',
      '```',
    ].join('\n'),
    params: [
      { label: 'text', doc: 'target text.' },
    ]
  },
  '$otriangle': {
    label: '$otriangle(text)',
    doc: [
      'Add bouten(傍点) of open triangle(\u25B3) to the text.',
      'In css, it\'s equivalent to `text-emphasis:open triangle`.',
      '### example',
      '```typescript',
      'これは$otriangle("重要")なことです。',
      '```',
    ].join('\n'),
    params: [
      { label: 'text', doc: 'target text.' },
    ]
  },
  '$fsesame': {
    label: '$fsesame(text)',
    doc: [
      'Add bouten(傍点) of filled sesame(\uFE45) to the text.',
      'In css, it\'s equivalent to `text-emphasis:filled sesame`.',
      '### example',
      '```typescript',
      'これは$fsesame("重要")なことです。',
      '```',
    ].join('\n'),
    params: [
      { label: 'text', doc: 'target text.' },
    ]
  },
  '$osesame': {
    label: '$fsesame(text)',
    doc: [
      'Add bouten(傍点) of open sesame(\uFE46) to the text.',
      'In css, it\'s equivalent to `text-emphasis:open sesame`.',
      '### example',
      '```typescript',
      'これは$osesame("重要")なことです。',
      '```',
    ].join('\n'),
    params: [
      { label: 'text', doc: 'target text.' },
    ]
  },
  '$strong': {
    label: '$b(text)',
    doc: [
      'Bold text.',
      '### example',
      '```typescript',
      'This is $strong("important").',
      '```',
    ].join('\n'),
    params: [
      { label: 'text', doc: 'bold text.' },
    ]
  },
  '$tcy': {
    label: '$tcy(text)',
    doc: [
      'Tcy(tate-chu-yoko) text in cjk vertical text.',
      '### example',
      '```typescript',
      '第$tcy("12")章',
      '```',
    ].join('\n'),
    params: [
      { label: 'text', doc: 'target text.' },
    ]
  },
  '$br': {
    label: '$br()',
    doc: [
      'Insert `line break` at this position.',
      '### example',
      '```',
      'This is line1. $br()',
      'This is line2',
      '```',
    ].join('\n'),
    params: []
  },
  '$hr': {
    label: '$hr()',
    doc: [
      'Insert `horizontal rule` at this position.',
      '### example',
      '```',
      '@p(){ paragraph1. }',
      '$hr()',
      '@p(){ paragraph2. }',
      '```',
    ].join('\n'),
    params: []
  },
  '$ruby': {
    label: '$ruby(rb, rt)',
    doc: [
      'Insert ruby.',
      '### example',
      '```',
      '$ruby("漢字", "かんじ")',
      '```',
    ].join('\n'),
    params: [
      { label: 'rb', doc: 'KANJI for <RB> tag.' },
      { label: 'rt', doc: 'YOMI for <RT> tag' },
    ]
  },
  '$page-break': {
    label: '$page-break()',
    doc: [
      'Insert `page break` at this position.',
      '### example',
      '```',
      'text at page1.',
      '$page-break()',
      'text at page2.',
      '```',
    ].join('\n'),
    params: []
  }
};

export class Builtins {
  static getSignature(key: string): BuiltinSignature | undefined {
    const head = key.charAt(0);
    if (head === '@') {
      return BuiltinBlockSignatures[key];
    }
    if (head === '$') {
      return BuiltinAnnotSignatures[key];
    }
    return undefined;
  }
}