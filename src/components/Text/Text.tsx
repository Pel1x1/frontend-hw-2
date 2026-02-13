import * as React from 'react';

export type TextProps = {
  className?: string;
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view = 'p-16',
  tag: Tag = 'p',
  weight = 'normal',
  children,
  color,
  maxLines,
}) => {
  // базовые стили под фигму
  const baseStyle: React.CSSProperties = {
    margin: 0,
    fontFamily: 'Roboto, system-ui, sans-serif',
    // цвет по умолчанию наследуем от родителя
    color: 'inherit',
  };

  // размеры и line-height из примера
  const viewStyle: React.CSSProperties =
    view === 'title'
      ? { fontSize: '44px', lineHeight: '48px' }
      : view === 'button'
      ? { fontSize: '18px', lineHeight: '22px' }
      : view === 'p-20'
      ? { fontSize: '20px', lineHeight: '24px' }
      : view === 'p-18'
      ? { fontSize: '18px', lineHeight: '22px' }
      : view === 'p-16'
      ? { fontSize: '16px', lineHeight: '20px' }
      : { fontSize: '14px', lineHeight: '18px' };

  // weight имеет приоритет над view
  const weightStyle: React.CSSProperties =
    weight === 'bold'
      ? { fontWeight: 700 }
      : weight === 'medium'
      ? { fontWeight: 500 }
      : { fontWeight: 400 };

  const colorStyle: React.CSSProperties = color === 'primary'
    ? { color: 'var(--text-primary)' }
    : color === 'secondary'
    ? { color: 'var(--text-secondary)' }
    : color === 'accent'
    ? { color: 'var(--text-accent)' }
    : {};

  // maxLines через -webkit-line-clamp
  const maxLinesStyle: React.CSSProperties = maxLines
    ? {
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }
    : {};

  const style: React.CSSProperties = {
    ...baseStyle,
    ...viewStyle,
    ...weightStyle,
    ...colorStyle,
    ...maxLinesStyle,
  };

  return (
    <Tag 
      className={`${className || ''}`.trim()} 
      style={style}
    >
      {children}
    </Tag>
  );
};

export default Text;
