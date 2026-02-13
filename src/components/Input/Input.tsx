import * as React from 'react';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  afterSlot,
  disabled,
  style,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const isDisabled = !!disabled;

  const wrapperStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    height: 52,
    width: 300,
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: isDisabled
      ? 'var(--input-bg-disabled)'
      : isFocused
      ? 'var(--input-bg-focus)'
      : 'var(--input-bg)',
    borderColor: isDisabled
      ? 'var(--input-border-disabled)'
      : isFocused
      ? 'var(--input-border-focus)'
      : 'var(--input-border)',
    cursor: isDisabled ? 'not-allowed' : 'text',
    boxSizing: 'border-box',
    columnGap: 8,
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: isDisabled
      ? 'var(--input-text-disabled)'
      : isFocused
      ? 'var(--input-text-focus)'
      : 'var(--input-text)',
    fontFamily: 'Roboto, system-ui, sans-serif',
    fontSize: 16,
    lineHeight: '20px',
    ...style,
  };

  const afterSlotStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  return (
    <div className={className} style={wrapperStyle}>
      <input
        {...props}
        type="text"               
        disabled={isDisabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
      />
      {afterSlot && <div style={afterSlotStyle}>{afterSlot}</div>}
    </div>
  );
};

export default Input;
