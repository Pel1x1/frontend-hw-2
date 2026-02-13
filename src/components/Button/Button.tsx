import * as React from 'react';
import classNames from 'classnames';
import Loader from '../Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

type ButtonStateStyleArgs = {
  isDisabled: boolean;
  isHovered: boolean;
  isActive: boolean;
};

const getButtonStyle = ({
  isDisabled,
  isHovered,
  isActive,
}: ButtonStateStyleArgs): React.CSSProperties => {
  if (isDisabled) {
    return {
      backgroundColor: 'var(--button-primary-bg-disabled)',
      color: 'var(--button-primary-text-disabled)',
    };
  }

  if (isActive) {
    return {
      backgroundColor: 'var(--button-primary-bg-active)',
      color: 'var(--button-primary-text-active)',
    };
  }

  if (isHovered) {
    return {
      backgroundColor: 'var(--button-primary-bg-hover)',
      color: 'var(--button-primary-text-hover)',
    };
  }

  return {
    backgroundColor: 'var(--button-primary-bg)',
    color: 'var(--button-primary-text)',
  };
};

const Button: React.FC<ButtonProps> = ({
  className,
  loading,
  disabled,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  // визуальный disabled — только по disabled пропу
  const isDisabledVisual = !!disabled;
  // нативный disabled — при disabled ИЛИ loading
  const isDisabledNative = !!disabled || !!loading;

  const buttonTextStyle: React.CSSProperties = {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '18px',
    letterSpacing: '0',
  };

  const mergedStyle: React.CSSProperties = {
    height: 52,
    minHeight: 52,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
    paddingBottom: 0,
    border: 'none',
    cursor: isDisabledNative ? 'not-allowed' : 'pointer',
    ...getButtonStyle({
      isDisabled: isDisabledVisual, // тут НЕ учитываем loading
      isHovered,
      isActive,
    }),
    ...style,
  };

  return (
    <button
      className={classNames('button', className)}
      disabled={isDisabledNative}
      style={mergedStyle}
      onMouseEnter={(e) => {
        if (!isDisabledNative) setIsHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (!isDisabledNative) {
          setIsHovered(false);
          setIsActive(false);
        }
        onMouseLeave?.(e);
      }}
      onMouseDown={(e) => {
        if (!isDisabledNative) setIsActive(true);
        onMouseDown?.(e);
      }}
      onMouseUp={(e) => {
        if (!isDisabledNative) setIsActive(false);
        onMouseUp?.(e);
      }}
      {...props}
    >
      {loading ? (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Loader size="s" className="color-button-primary-text" />
          <span style={buttonTextStyle}>{children}</span>
        </span>
      ) : (
        <span style={buttonTextStyle}>{children}</span>
      )}
    </button>
  );
};

export default Button;
