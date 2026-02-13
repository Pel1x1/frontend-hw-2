import * as React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const getColorStyle = (color?: IconProps['color']): React.CSSProperties => {
   switch (color) {
    case 'primary': return { color: 'var(--text-primary)' };
    case 'secondary': return { color: 'var(--text-secondary)' };
    case 'accent': return { color: 'var(--text-accent)' };
    default: return {};
  }
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className = '',
  color,
  children,
  ...props
}) => {
  return (
    <svg
      className={className}
      style={{
        width: props.width || '24px',
        height: props.height || '24px',
        ...getColorStyle(color),
        ...props.style
      }}
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
