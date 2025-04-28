// Task: 
// Render a list of 10,000 items using a virtualization strategy (e.g., react-window):
// Profile the performance using React Profiler before and after optimization.
// Optimize unnecessary re-renders using React.memo and useCallback.

// Focus: Virtualization, re-render minimization, profiling

import React, { useCallback } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

// Memoized Row Component
const Row = React.memo(({ index, style }: ListChildComponentProps) => {
  return (
    <div style={style}>
      Row #{index}
    </div>
  );
});

export default function VirtualizedListExample() {
  const itemCount = 10000;
  const itemSize = 35;

  const renderRow = useCallback(
    (props: ListChildComponentProps) => <Row {...props} />,
    []
  );

  return (
    <List
      height={500}
      itemCount={itemCount}
      itemSize={itemSize}
      width={'100%'}
    >
      {renderRow}
    </List>
  );
}