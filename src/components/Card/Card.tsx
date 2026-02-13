import * as React from 'react';
import Text from '../Text';

export type CardProps = {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const cardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--card-bg)',
    overflow: 'hidden',
    transition: 'box-shadow 200ms ease',
    maxWidth: 360,
    cursor: onClick ? 'pointer' : 'default',
    boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
  };

  const imageWrapperStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '1',
    backgroundColor: 'var(--card-image-bg)',
    position: 'relative',
    overflow: 'hidden',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  const bodyStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 20,
    padding: 24,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 8,
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 12,
  };

  const contentSlotStyle: React.CSSProperties = {
    marginRight: 8,
  };

  const actionSlotStyle: React.CSSProperties = {
    flexShrink: 0,
  };

  return (
    <div
      className={className}
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Image */}
      <div style={imageWrapperStyle}>
        <img src={image} alt="" style={imageStyle} />
      </div>

      {/* Body */}
      <div style={bodyStyle}>
        <div style={headerStyle}>
          {captionSlot && (
            <Text
              tag="p"
              view="p-14"
              weight="medium"
              color="secondary"
              maxLines={1}
            >
              {captionSlot}
            </Text>
          )}

          <Text
            tag="h3"
            view="p-20"
            weight="medium"
            color="primary"
            maxLines={2}  
          >
            {title}
          </Text>

          <Text
            tag="p"
            view="p-16"
            color="secondary"
            maxLines={3}  
          >
            {subtitle}
          </Text>
        </div>

        {(contentSlot || actionSlot) && (
          <div style={footerStyle}>
            {contentSlot && (
              <div style={contentSlotStyle}>
                <Text
                  tag="p"
                  view="p-20"
                  weight="medium"
                  color="primary"
                >
                  {contentSlot}
                </Text>
              </div>
            )}
            <div style={actionSlotStyle}>
              {actionSlot}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
