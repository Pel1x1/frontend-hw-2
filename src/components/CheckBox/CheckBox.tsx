import * as React from "react";
import CheckIcon from "../icons/CheckIcon";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, disabled, checked, ...props }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (disabled) return;
    onChange(e.target.checked);
  };

  const boxStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: disabled
      ? "var(--checkbox-bg-disabled)"
      : isHovered
      ? "var(--checkbox-bg-hover)"
      : "var(--checkbox-bg)",
    borderColor: disabled
      ? "var(--checkbox-border-disabled)"
      : isHovered
      ? "var(--checkbox-border-hover)"
      : "var(--checkbox-border)",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background-color 0.15s ease, border-color 0.15s ease",
    boxSizing: "border-box",
    color: disabled
    ? "var(--checkbox-check-disabled)"
    : isHovered
    ? "var(--checkbox-check-hover)"
    : "var(--checkbox-check)"
  };

  const inputStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    opacity: 0,
    margin: 0,
    cursor: disabled ? "not-allowed" : "pointer",
  };


  return (
    <label
      style={{ display: "inline-flex", position: "relative" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={boxStyle}>
        {checked && (
          <CheckIcon
            width={40}
            height={40}
          />
        )}
      </span>
      <input
        {...props}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
        style={inputStyle}
      />
    </label>
  );
};

export default CheckBox;
