import { Tooltip, Typography } from '@material-ui/core';
import { useRef, useState, useEffect } from 'react';


const EllipsisTooltip = ({ children } : { children: React.ReactElement<any, any> }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLSpanElement>(null);
  const [isEllipsized, setIsEllipsized] = useState(false);

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = contentRef.current.offsetWidth;
      setIsEllipsized(contentWidth > containerWidth);
    }
  }, [children]);

return (
    <div ref={containerRef}>
        <Tooltip title={isEllipsized  && children }>
            <Typography ref={contentRef}>
                {children || ''}
            </Typography>
        </Tooltip>
    </div>
);

};

export default EllipsisTooltip;
