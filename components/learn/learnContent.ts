import {
  LearnArticle,
  LearnBlock,
  LearnCategory,
  LearnChecklistBlock,
  LearnContent,
  LearnImageBlock,
  LearnTextBlock,
} from './learnTypes';

const DEFAULT_CONTENT: LearnContent = {
  version: 1,
  categories: [],
  footer: {
    disclaimer: '',
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

function parseBlock(value: unknown): LearnBlock | null {
  if (!isRecord(value) || typeof value.type !== 'string') return null;

  const type = value.type;

  if (type === 'text' || type === 'formula' || type === 'warning') {
    const content = asString(value.content);
    if (!content) return null;
    const block: LearnTextBlock = { type, content };
    return block;
  }

  if (type === 'checklist') {
    const items = asStringArray(value.items);
    if (items.length === 0) return null;
    const block: LearnChecklistBlock = {
      type,
      title: asString(value.title, 'Checklist'),
      items,
    };
    return block;
  }

  if (type === 'image') {
    const caption = asString(value.caption);
    if (!caption) return null;
    const block: LearnImageBlock = {
      type,
      asset: asString(value.asset),
      caption,
    };
    return block;
  }

  return null;
}

function parseArticle(value: unknown): LearnArticle | null {
  if (!isRecord(value)) return null;

  const blocks = Array.isArray(value.blocks)
    ? value.blocks.map(parseBlock).filter((block): block is LearnBlock => !!block)
    : [];

  if (!asString(value.id) || !asString(value.title) || blocks.length === 0) {
    return null;
  }

  return {
    id: asString(value.id),
    title: asString(value.title),
    blocks,
  };
}

function parseCategory(value: unknown): LearnCategory | null {
  if (!isRecord(value)) return null;

  const articles = Array.isArray(value.articles)
    ? value.articles
        .map(parseArticle)
        .filter((article): article is LearnArticle => !!article)
    : [];

  if (!asString(value.id) || !asString(value.title) || articles.length === 0) {
    return null;
  }

  return {
    id: asString(value.id),
    title: asString(value.title),
    description: asString(value.description),
    articles,
  };
}

export function parseLearnContent(input: unknown): LearnContent {
  if (!isRecord(input)) return DEFAULT_CONTENT;

  const categories = Array.isArray(input.categories)
    ? input.categories
        .map(parseCategory)
        .filter((category): category is LearnCategory => !!category)
    : [];

  return {
    version: typeof input.version === 'number' ? input.version : 1,
    categories,
    footer: {
      disclaimer: isRecord(input.footer) ? asString(input.footer.disclaimer) : '',
    },
  };
}
