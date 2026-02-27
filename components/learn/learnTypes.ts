export type LearnContent = {
  version: number;
  categories: LearnCategory[];
  footer: {
    disclaimer: string;
  };
};

export type LearnCategory = {
  id: string;
  title: string;
  description: string;
  articles: LearnArticle[];
};

export type LearnArticle = {
  id: string;
  title: string;
  blocks: LearnBlock[];
};

export type LearnTextBlock = {
  type: 'text' | 'formula' | 'warning';
  content: string;
};

export type LearnChecklistBlock = {
  type: 'checklist';
  title: string;
  items: string[];
};

export type LearnImageBlock = {
  type: 'image';
  asset: string;
  caption: string;
};

export type LearnBlock = LearnTextBlock | LearnChecklistBlock | LearnImageBlock;
