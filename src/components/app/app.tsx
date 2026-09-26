import { defaultArticleState, type ArticleStateType } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState, type CSSProperties } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [articleParams, setArticleParams] =
    useState<ArticleStateType>(defaultArticleState);

  const handleArticleParams = (newArticleParams: ArticleStateType): void => {
    setArticleParams(newArticleParams);
  };

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': articleParams.fontFamilyOption.value,
          '--font-size': articleParams.fontSizeOption.value,
          '--font-color': articleParams.fontColor.value,
          '--container-width': articleParams.contentWidth.value,
          '--bg-color': articleParams.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm onStateChanging={handleArticleParams} />
      <Article />
    </main>
  );
};
