import React from 'react';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const sizeStyles: Record<'s' | 'm' | 'l', React.CSSProperties> = {
  s: {
    width: '24px',
    height: '24px'
  },
  m: {
    width: '48px',
    height: '48px'
  },
  l: {
    width: '60px',
    height: '60px'
  }
};

const loaderSizeStyles: Record<'s' | 'm' | 'l', React.CSSProperties> = {
  s: {
    width: '16px',
    height: '16px',
    borderWidth: '2px'
  },
  m: {
    width: '32px',
    height: '32px',
    borderWidth: '4px'
  },
  l: {
    width: '40px',
    height: '40px',
    borderWidth: '5px'
  }
};

const Loader: React.FC<LoaderProps> = ({ size = 'm', className }) => {
  const baseCircleStyle: React.CSSProperties = {
    borderRadius: '50%',
    borderStyle: 'solid',
    borderTopColor: 'transparent',
    backgroundColor: 'transparent',
    animation: 'spin 2s linear infinite',
    ...loaderSizeStyles[size],
  };

  // если className НЕ передан — используем дефолтный цвет
  const circleStyle: React.CSSProperties =
    className == null || className === ''
      ? {
          borderColor: 'var(--loader-bg)',
          ...baseCircleStyle,
          
        }
      : baseCircleStyle;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sizeStyles[size],
      }}
      className={className}
      role="status"
      aria-label="Загрузка"
    >
      <div
        style={circleStyle}
        
      />
    </div>
  );
};

export default Loader;