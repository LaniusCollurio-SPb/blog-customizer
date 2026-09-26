import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type ArticleStateType,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { useOutsideClickClose } from '@/ui/select/hooks/useOutsideClickClose';
import { Separator } from '@/ui/separator';
import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onStateChanging: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onStateChanging,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [articleState, setArticleState] =
    useState<ArticleStateType>(defaultArticleState);
  const togglePanel = (): void => {
    setIsPanelOpen((isPanelOpen) => !isPanelOpen);
  };
  const rootRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen: isPanelOpen,
    rootRef,
    onChange: togglePanel,
  });

  const updateFieldState = <K extends keyof ArticleStateType>(field: K) => {
    return (value: ArticleStateType[K]): void => {
      setArticleState((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    };
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onStateChanging(articleState);
  };

  const handleReset = (): void => {
    setArticleState(defaultArticleState);
    onStateChanging(defaultArticleState);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isPanelOpen} onClick={togglePanel} />
      <aside
        className={clsx(styles.container, { [styles.container_open]: isPanelOpen })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            options={fontFamilyOptions}
            selected={articleState.fontFamilyOption}
            onChange={updateFieldState('fontFamilyOption')}
            title="Шрифт"
          />
          <RadioGroup
            name="radio"
            options={fontSizeOptions}
            selected={articleState.fontSizeOption}
            onChange={updateFieldState('fontSizeOption')}
            title="Шрифт"
          />
          <Select
            options={fontColors}
            selected={articleState.fontColor}
            onChange={updateFieldState('fontColor')}
            title="Цвет шрифт"
          />
          <Separator />
          <Select
            options={backgroundColors}
            selected={articleState.backgroundColor}
            onChange={updateFieldState('backgroundColor')}
            title="Цвет фона"
          />
          <Select
            options={contentWidthArr}
            selected={articleState.contentWidth}
            onChange={updateFieldState('contentWidth')}
            title="Ширина контента"
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
