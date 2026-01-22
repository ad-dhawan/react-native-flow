# RNFlow - Quick Reference Guide

## Installation

```bash
npm install react-native-rnflow react-native-svg react-native-gesture-handler react-native-reanimated
```

## Basic Usage

```tsx
import RNFlow, { RNFlowNode } from 'react-native-rnflow';

const data: RNFlowNode = {
  id: '1',
  data: { title: 'Root' },
  children: [
    { id: '2', data: { title: 'Child 1' } },
    { id: '3', data: { title: 'Child 2' } },
  ],
};

<RNFlow data={data} />
```

## Common Props Quick Reference

### Layout
```tsx
layout={{
  direction: 'vertical', // or 'horizontal'
  nodeWidth: 120,
  nodeHeight: 56,
  levelGap: 140,
  siblingGap: 160,
}}
```

### Zoom
```tsx
zoom={{
  minZoom: 0.5,
  maxZoom: 2,
  enableZoomControls: true,
  showZoomInButton: true,
  showZoomOutButton: true,
  showResetButton: true,
  iconComponent: Icon, // Your icon library
  iconSize: 24,
  iconColor: '#2196F3',
}}
```

### Scroll
```tsx
scroll={{
  hideScrollBars: true,
  autoCenter: true,
  bounces: true,
}}
```

### Styling
```tsx
style={{
  backgroundColor: '#F5F5F5',
  canvasBackgroundColor: '#FFF',
  containerStyle: { flex: 1 },
  nodeStyle: {
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  edgeStyle: {
    stroke: '#666',
    strokeWidth: 2,
  },
}}
```

### Interactions
```tsx
interaction={{
  onNodePress: (node) => console.log(node.id),
  onZoomChange: (zoom) => console.log(zoom),
}}
```

### Custom Rendering
```tsx
render={{
  renderNode: (node, { isSelected, onPress, dimensions }) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{node.data.title}</Text>
    </TouchableOpacity>
  ),
}}
```

## Edge Types

```tsx
edgeType="straight"    // Straight lines
edgeType="curved"      // Bezier curves
edgeType="step"        // Step lines (default)
edgeType="smoothstep"  // Smooth step lines
```

## Icon Examples

### Material Icons
```tsx
import Icon from 'react-native-vector-icons/MaterialIcons';

zoom={{ iconComponent: Icon }}
```

### Custom Icons Per Button
```tsx
zoom={{
  customIcons: {
    zoomIn: (props) => <Icon name="add" {...props} />,
    zoomOut: (props) => <Icon name="remove" {...props} />,
    reset: (props) => <Icon name="fullscreen" {...props} />,
  },
}}
```

## Hide/Show Controls

```tsx
// Hide zoom controls
zoom={{ enableZoomControls: false }}

// Hide specific buttons
zoom={{
  showZoomInButton: true,
  showZoomOutButton: true,
  showResetButton: false,
}}

// Hide scrollbars
scroll={{ hideScrollBars: true }}
```

## Complete Example

```tsx
import React, { useState } from 'react';
import RNFlow, { RNFlowNode } from 'react-native-rnflow';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MyChart = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const data: RNFlowNode = {
    id: 'root',
    data: { title: 'CEO', name: 'John' },
    children: [
      { id: 'cto', data: { title: 'CTO', name: 'Jane' } },
      { id: 'cfo', data: { title: 'CFO', name: 'Bob' } },
    ],
  };

  return (
    <RNFlow
      data={data}
      selectedNodeIds={selected}
      layout={{
        direction: 'vertical',
        nodeWidth: 200,
        nodeHeight: 100,
      }}
      zoom={{
        iconComponent: Icon,
        iconColor: '#2196F3',
        showResetButton: false,
      }}
      scroll={{
        hideScrollBars: true,
      }}
      interaction={{
        onNodePress: (node) => setSelected([node.id]),
      }}
      style={{
        backgroundColor: '#F5F7FA',
        nodeStyle: {
          backgroundColor: '#FFF',
          borderRadius: 12,
        },
      }}
      edgeType="smoothstep"
    />
  );
};

export default MyChart;
```

## TypeScript Types

```typescript
import { RNFlowNode, RNFlowProps } from 'react-native-rnflow';

interface MyData {
  title: string;
  subtitle?: string;
}

const node: RNFlowNode<MyData> = {
  id: '1',
  data: { title: 'Title' },
};
```

## Troubleshooting

### Gestures not working?
Add to top of your app:
```tsx
import 'react-native-gesture-handler';
```

### Icons not showing?
Install and configure:
```bash
npm install react-native-vector-icons
cd ios && pod install
```

### Zoom not animating?
Check babel.config.js:
```javascript
plugins: ['react-native-reanimated/plugin']
```

## Performance Tips

1. Memoize custom render functions
2. Keep node data lean
3. Use appropriate zoom limits
4. Enable virtualization for 100+ nodes

## Links

- [Full Documentation](./README_COMPLETE.md)
- [Examples](./RNFlowExamples.tsx)
- [Migration Guide](./MIGRATION.md)
- [Contributing](./CONTRIBUTING.md)

## License

MIT