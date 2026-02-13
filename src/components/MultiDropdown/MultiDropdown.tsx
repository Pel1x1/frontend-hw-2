import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Input from "../Input";
import ArrowDownIcon from "../icons/ArrowDownIcon"; // путь подправь под свой проект

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
};

const Multidropdown = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}: MultiDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    if (!filter.trim()) return options;
    return options.filter((o) =>
      o.value.toLowerCase().includes(filter.toLowerCase())
    );
  }, [options, filter]);

  const selectedKeys = useMemo(() => value.map((v) => v.key), [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setFilter("");
      setHoveredKey(null);
    }
  }, [isOpen]);

  const handleInputClick = () => {
    if (disabled) return;
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleOptionClick = useCallback(
    (option: Option) => {
      const isSelected = selectedKeys.includes(option.key);
      const newValue = isSelected
        ? value.filter((v) => v.key !== option.key)
        : [...value, option];
      onChange(newValue);
    },
    [value, selectedKeys, onChange]
  );

  const emptyTitle = getTitle([]);
  const rawDisplay = isOpen ? filter : getTitle(value);
  const inputValue =
    !isOpen && rawDisplay === emptyTitle ? "" : rawDisplay;

  return (
    <div
      ref={containerRef}
      className={className}
      data-testid="multidropdown"
      style={{ position: "relative", width: 300 }}
    >
      <Input
        data-testid="multidropdown-input"
        placeholder={emptyTitle}
        disabled={disabled}
        value={inputValue}
        onChange={(val) => {
          setFilter(val);
          if (!isOpen && !disabled) {
            setIsOpen(true);
          }
        }}
        onClick={handleInputClick}
        readOnly={!isOpen}
        afterSlot={
          <ArrowDownIcon
            width={16}
            height={16}

          />
        }
      />

      {isOpen && !disabled && (
        <div
          data-testid="dropdown-options"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)", // 8px между инпутом и списком
            left: 0,
            right: 0,
            zIndex: 10,
            background: "#ffffff", // фон списка
            maxHeight: "200px",
            overflowY: "auto",
            boxShadow: "0px 4px 10px 0px #00000040"
          }}
        >
          {filteredOptions.map((option) => {
            const isSelected = selectedKeys.includes(option.key);
            const isHovered = hoveredKey === option.key;

            const baseBg = "transparent"; // не меняем bg для selected
            const bgColor = baseBg;
            const textColor = isSelected
              ? "var(--text-accent)"
              : isHovered
              ? "var(--text-secondary)"
              : "var(--text)";

            return (
              <div
                key={option.key}
                data-testid={`option-${option.key}`}
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => setHoveredKey(option.key)}
                onMouseLeave={() => setHoveredKey(null)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor: bgColor,
                  color: textColor,
                }}
              >
                {option.value}
              </div>
            );
          })}
          {filteredOptions.length === 0 && (
            <div style={{ padding: "8px" }}>Ничего не найдено</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Multidropdown;