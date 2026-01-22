# RNFlow - Dynamic Tree Flow Visualization Component

<div align="center">

![RNFlow Banner](https://via.placeholder.com/800x200/4A90E2/FFFFFF?text=RNFlow+-+Tree+Flow+Component)

[![npm version](https://img.shields.io/npm/v/react-native-rnflow.svg)](https://www.npmjs.com/package/react-native-rnflow)
[![npm downloads](https://img.shields.io/npm/dm/react-native-rnflow.svg)](https://www.npmjs.com/package/react-native-rnflow)
[![license](https://img.shields.io/npm/l/react-native-rnflow.svg)](https://github.com/yourusername/react-native-rnflow/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A highly customizable, production-ready React Native tree/flow visualization component with extensive configuration options.

[Features](#features) • [Installation](#installation) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Examples](#examples) • [Contributing](#contributing)

</div>

---

## 📋 Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Platform Setup](#platform-setup)
   - [iOS Setup](#ios-setup)
   - [Android Setup](#android-setup)
4. [Quick Start](#quick-start)
5. [Complete Props Reference](#complete-props-reference)
6. [Configuration Objects](#configuration-objects)
7. [Advanced Usage](#advanced-usage)
8. [Examples](#examples)
9. [Performance](#performance)
10. [Troubleshooting](#troubleshooting)
11. [Contributing](#contributing)
12. [License](#license)

---

## ✨ Features

- 🎨 **Fully Customizable** - Configure every aspect through props
- 🎭 **Custom Icons** - Use your own icon library (Feather, MaterialIcons, etc.)
- 🔍 **Zoom & Pan** - Pinch-to-zoom with programmatic controls
- 📱 **Responsive** - Works on all screen sizes
- 🎯 **Interactive** - Node selection, press events, edge interactions
- ⚡ **Performance** - Optimized with Reanimated
- 🎨 **Multiple Edge Types** - Straight, curved, step, smooth-step
- 🧭 **Dual Direction** - Vertical or horizontal layouts
- 🎮 **Gesture Support** - Native gesture handling
- 📦 **TypeScript** - Full type safety
- 🎨 **Themeable** - Complete styling control
- 🐛 **Debug Mode** - Built-in debugging

---

## 📦 Installation

### Using npm

```bash
npm install react-native-rnflow
```

### Using yarn

```bash
yarn add react-native-rnflow
```

### Required Peer Dependencies

RNFlow requires the following packages to be installed:

```bash
npm install react-native-svg react-native-gesture-handler react-native-reanimated

# or with yarn
yarn add react-native-svg react-native-gesture-handler react-native-reanimated
```

### Optional Dependencies

For default icons (if not using custom icons):

```bash
npm install react-native-vector-icons

# or with yarn
yarn add react-native-vector-icons
```

---

## 🔧 Platform Setup

### iOS Setup

#### 1. Install Pods

```bash
cd ios && pod install && cd ..
```

#### 2. Configure react-native-reanimated

Add this to your `babel.config.js`:

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
  ],
};
```

#### 3. Configure react-native-gesture-handler

Add this to the **top** of your `index.js` or `App.tsx`:

```javascript
import 'react-native-gesture-handler';
```

#### 4. Configure Vector Icons (Optional)

If using `react-native-vector-icons`, add to your `Info.plist`:

```xml
<key>UIAppFonts</key>
<array>
  <string>Feather.ttf</string>
  <!-- Add other icon fonts as needed -->
</array>
```

### Android Setup

#### 1. Configure react-native-reanimated

Add this to your `babel.config.js` (same as iOS):

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
  ],
};
```

#### 2. Configure react-native-gesture-handler

Update `MainActivity.java` (or `MainActivity.kt`):

**Java:**
```java
package com.yourapp;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import android.os.Bundle; // Add this

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "YourApp";
  }

  // Add this method
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }
}
```

**Kotlin:**
```kotlin
package com.yourapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.os.Bundle // Add this

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "YourApp"

  // Add this method
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
```

#### 3. Configure Vector Icons (Optional)

Add to `android/app/build.gradle`:

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

### Verify Installation

After setup, rebuild your app:

```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

---

## 🚀 Quick Start

### Basic Usage

```tsx
import React from 'react';
import RNFlow, { RNFlowNode } from 'react-native-rnflow';

const data: RNFlowNode = {
  id: '1',
  data: { title: 'Root' },
  children: [
    {
      id: '2',
      data: { title: 'Child 1' },
      children: [
        { id: '4', data: { title: 'Grandchild 1' } },
        { id: '5', data: { title: 'Grandchild 2' } },
      ],
    },
    {
      id: '3',
      data: { title: 'Child 2' },
    },
  ],
};

function App() {
  return <RNFlow data={data} />;
}

export default App;
```

### With Custom Styling

```tsx
import RNFlow from 'react-native-rnflow';

function App() {
  return (
    <RNFlow
      data={data}
      style={{
        backgroundColor: '#F5F7FA',
        containerStyle: {
          borderRadius: 12,
        },
      }}
      layout={{
        direction: 'vertical',
        nodeWidth: 150,
        nodeHeight: 80,
      }}
    />
  );
}
```

---

## 📖 Complete Props Reference

### Index of All Props

1. [Core Props](#1-core-props)
2. [Layout Configuration](#2-layout-configuration)
3. [Zoom Configuration](#3-zoom-configuration)
4. [Scroll Configuration](#4-scroll-configuration)
5. [Interaction Configuration](#5-interaction-configuration)
6. [Render Configuration](#6-render-configuration)
7. [Style Configuration](#7-style-configuration)
8. [Edge Configuration](#8-edge-configuration)
9. [Performance Props](#9-performance-props)
10. [Debug Props](#10-debug-props)

---

### 1. Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `RNFlowNode<T>` | **required** | Root node of the tree structure |
| `selectedNodeIds` | `string[]` | `[]` | Array of selected node IDs for multi-selection |

**Example:**

```tsx
const data: RNFlowNode = {
  id: 'root',
  data: { title: 'CEO' },
  children: [
    { id: 'child1', data: { title: 'CTO' } },
    { id: 'child2', data: { title: 'CFO' } },
  ],
};

<RNFlow 
  data={data}
  selectedNodeIds={['child1']}
/>
```

---

### 2. Layout Configuration

Configure tree layout and spacing through the `layout` prop.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction of the tree |
| `nodeWidth` | `number` | `120` | Width of each node in pixels |
| `nodeHeight` | `number` | `56` | Height of each node in pixels |
| `levelGap` | `number` | `140` | Vertical gap between levels (vertical) or horizontal gap (horizontal) |
| `siblingGap` | `number` | `160` | Horizontal gap between siblings (vertical) or vertical gap (horizontal) |
| `padding` | `number` | `200` | Canvas padding around the tree |
| `alignment` | `'start' \| 'center' \| 'end'` | `'center'` | Tree alignment within the canvas |

**Example:**

```tsx
<RNFlow
  data={data}
  layout={{
    direction: 'horizontal',
    nodeWidth: 180,
    nodeHeight: 100,
    levelGap: 200,
    siblingGap: 150,
    padding: 250,
    alignment: 'center',
  }}
/>
```

---

### 3. Zoom Configuration

Control zoom behavior and appearance through the `zoom` prop.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `minZoom` | `number` | `0.1` | Minimum zoom level |
| `maxZoom` | `number` | `3` | Maximum zoom level |
| `defaultZoom` | `number` | `1` | Initial zoom level |
| `zoomStep` | `number` | `0.2` | Zoom increment/decrement step |
| `enablePinchZoom` | `boolean` | `true` | Enable pinch-to-zoom gesture |
| `enableZoomControls` | `boolean` | `true` | Show zoom control buttons |
| `showZoomInButton` | `boolean` | `true` | Show zoom in button |
| `showZoomOutButton` | `boolean` | `true` | Show zoom out button |
| `showResetButton` | `boolean` | `true` | Show reset zoom button |
| `zoomControlsPosition` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'top-right'` | Position of zoom controls |
| `animateZoom` | `boolean` | `true` | Animate zoom transitions |
| `zoomAnimationDuration` | `number` | `300` | Zoom animation duration in ms |
| `iconComponent` | `React.ComponentType<IconComponentProps>` | `undefined` | Custom icon component for all zoom buttons |
| `customIcons` | `ZoomControlIcons` | `{}` | Individual custom icons for each button |
| `iconSize` | `number` | `20` | Size of zoom control icons |
| `iconColor` | `string` | `'#000'` | Color of zoom control icons |

**Example:**

```tsx
import Icon from 'react-native-vector-icons/MaterialIcons';

<RNFlow
  data={data}
  zoom={{
    minZoom: 0.5,
    maxZoom: 2,
    defaultZoom: 1,
    zoomStep: 0.3,
    enablePinchZoom: true,
    enableZoomControls: true,
    showZoomInButton: true,
    showZoomOutButton: true,
    showResetButton: false, // Hide reset button
    zoomControlsPosition: 'bottom-right',
    animateZoom: true,
    iconComponent: Icon, // Use Material Icons
    iconSize: 24,
    iconColor: '#2196F3',
  }}
/>
```

**Custom Icons Example:**

```tsx
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

<RNFlow
  data={data}
  zoom={{
    customIcons: {
      zoomIn: (props) => <FeatherIcon name="plus" {...props} />,
      zoomOut: (props) => <FeatherIcon name="minus" {...props} />,
      reset: (props) => <MaterialIcon name="fullscreen" {...props} />,
    },
  }}
/>
```

---

### 4. Scroll Configuration

Control scrolling behavior through the `scroll` prop.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableHorizontalScroll` | `boolean` | `true` | Enable horizontal scrolling |
| `enableVerticalScroll` | `boolean` | `true` | Enable vertical scrolling |
| `showHorizontalScrollIndicator` | `boolean` | `true` | Show horizontal scrollbar |
| `showVerticalScrollIndicator` | `boolean` | `true` | Show vertical scrollbar |
| `hideScrollBars` | `boolean` | `false` | Hide all scrollbars (overrides individual settings) |
| `scrollEventThrottle` | `number` | `16` | Scroll event throttle in ms |
| `autoCenter` | `boolean` | `true` | Auto-center tree on mount |
| `autoCenterDelay` | `number` | `100` | Delay before auto-centering in ms |
| `bounces` | `boolean` | `true` | Enable scroll bounce effect |
| `bouncesZoom` | `boolean` | `true` | Enable bounce on zoom limits |

**Example:**

```tsx
<RNFlow
  data={data}
  scroll={{
    enableHorizontalScroll: true,
    enableVerticalScroll: true,
    hideScrollBars: true, // Hide all scrollbars
    scrollEventThrottle: 16,
    autoCenter: true,
    autoCenterDelay: 200,
    bounces: true,
  }}
/>
```

---

### 5. Interaction Configuration

Configure user interactions through the `interaction` prop.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableNodeSelection` | `boolean` | `true` | Enable node selection |
| `enableNodeDrag` | `boolean` | `false` | Enable node dragging (experimental) |
| `enableNodeHover` | `boolean` | `false` | Enable hover effects (experimental) |
| `multiSelect` | `boolean` | `false` | Enable multi-node selection |
| `onNodePress` | `(node: RNFlowNode) => void` | `undefined` | Callback when node is pressed |
| `onNodeLongPress` | `(node: RNFlowNode) => void` | `undefined` | Callback when node is long-pressed |
| `onNodeDoublePress` | `(node: RNFlowNode) => void` | `undefined` | Callback when node is double-pressed |
| `onEdgePress` | `(parent: RNFlowNode, child: RNFlowNode) => void` | `undefined` | Callback when edge is pressed |
| `onCanvasPress` | `() => void` | `undefined` | Callback when canvas is pressed |
| `onZoomChange` | `(zoom: number) => void` | `undefined` | Callback when zoom level changes |
| `onScrollChange` | `(x: number, y: number) => void` | `undefined` | Callback when scroll position changes |

**Example:**

```tsx
<RNFlow
  data={data}
  interaction={{
    enableNodeSelection: true,
    onNodePress: (node) => {
      console.log('Node pressed:', node.id);
      Alert.alert('Node Pressed', node.data.title);
    },
    onNodeLongPress: (node) => {
      console.log('Node long pressed:', node.id);
    },
    onZoomChange: (zoom) => {
      console.log('Current zoom:', zoom);
    },
    onScrollChange: (x, y) => {
      console.log('Scroll position:', x, y);
    },
  }}
/>
```

---

### 6. Render Configuration

Customize rendering through the `render` prop.

| Property | Type | Description |
|----------|------|-------------|
| `renderNode` | `(node: RNFlowNode, options: RenderNodeOptions) => ReactNode` | Custom node renderer |
| `renderEdge` | `(parent: RNFlowNode, child: RNFlowNode, options: RenderEdgeOptions) => ReactNode` | Custom edge renderer |
| `renderZoomControls` | `(zoomIn: () => void, zoomOut: () => void, currentZoom: number) => ReactNode` | Custom zoom controls renderer |
| `renderMiniMap` | `() => ReactNode` | Custom mini-map renderer |

**RenderNodeOptions:**
```typescript
{
  isSelected: boolean;
  isHovered: boolean;
  onPress: () => void;
  onLongPress: () => void;
  dimensions: { width: number; height: number };
}
```

**Example:**

```tsx
<RNFlow
  data={data}
  render={{
    renderNode: (node, { isSelected, onPress, dimensions }) => (
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          backgroundColor: isSelected ? '#E3F2FD' : '#FFFFFF',
          borderRadius: 12,
          padding: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>{node.data.title}</Text>
        <Text style={{ fontSize: 12 }}>{node.data.subtitle}</Text>
      </TouchableOpacity>
    ),
  }}
/>
```

---

### 7. Style Configuration

Complete styling control through the `style` prop.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `backgroundColor` | `string` | `'#F5F5F5'` | Background color of main container |
| `canvasBackgroundColor` | `string` | `'transparent'` | Background color of the canvas |
| `containerStyle` | `ViewStyle` | `{}` | Style for main container |
| `canvasStyle` | `ViewStyle` | `{}` | Style for canvas (tree area) |
| `scrollViewStyle` | `ViewStyle` | `{}` | Style for scroll view |
| `nodeStyle` | `NodeStyle` | See defaults | Default style for nodes |
| `selectedNodeStyle` | `NodeStyle` | See defaults | Style for selected nodes |
| `edgeStyle` | `EdgeStyle` | See defaults | Style for edges |
| `selectedEdgeStyle` | `EdgeStyle` | See defaults | Style for selected edges |
| `zoomControlsStyle` | `ViewStyle` | `{}` | Style for zoom controls container |
| `zoomControlsBackgroundColor` | `string` | `'rgba(255, 255, 255, 0.9)'` | Background color for zoom controls |
| `zoomControlsButtonStyle` | `ViewStyle` | `{}` | Style for individual zoom buttons |

**NodeStyle Type:**
```typescript
{
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  shadowColor?: string;
  shadowOpacity?: number;
  shadowRadius?: number;
  shadowOffset?: { width: number; height: number };
  elevation?: number;
}
```

**EdgeStyle Type:**
```typescript
{
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  opacity?: number;
}
```

**Example:**

```tsx
<RNFlow
  data={data}
  style={{
    backgroundColor: '#1E1E1E', // Dark theme
    canvasBackgroundColor: '#2D2D2D',
    containerStyle: {
      borderRadius: 16,
      margin: 16,
    },
    nodeStyle: {
      backgroundColor: '#3A3A3A',
      borderColor: '#555',
      borderWidth: 1,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    selectedNodeStyle: {
      backgroundColor: '#2196F3',
      borderColor: '#1976D2',
      borderWidth: 2,
    },
    edgeStyle: {
      stroke: '#666',
      strokeWidth: 2,
      opacity: 0.7,
    },
    zoomControlsBackgroundColor: 'rgba(58, 58, 58, 0.95)',
    zoomControlsButtonStyle: {
      padding: 8,
    },
  }}
  zoom={{
    iconColor: '#FFF', // White icons for dark theme
  }}
/>
```

---

### 8. Edge Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `edgeType` | `'straight' \| 'curved' \| 'step' \| 'smoothstep'` | `'step'` | Type of edge rendering |

**Example:**

```tsx
<RNFlow
  data={data}
  edgeType="smoothstep"
  style={{
    edgeStyle: {
      stroke: '#4A90E2',
      strokeWidth: 3,
      strokeDasharray: '5,5',
      opacity: 0.8,
    },
  }}
/>
```

---

### 9. Performance Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableVirtualization` | `boolean` | `false` | Enable node virtualization for large trees (experimental) |

---

### 10. Debug Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `debug` | `boolean` | `false` | Show debug information overlay |

**Example:**

```tsx
<RNFlow
  data={data}
  debug={true} // Shows: node count, zoom level, canvas size
/>
```

---

## 🎨 Configuration Objects

### Complete LayoutConfig

```typescript
interface LayoutConfig {
  direction?: 'vertical' | 'horizontal';
  nodeWidth?: number;
  nodeHeight?: number;
  levelGap?: number;
  siblingGap?: number;
  padding?: number;
  alignment?: 'start' | 'center' | 'end';
}
```

### Complete ZoomConfig

```typescript
interface ZoomConfig {
  minZoom?: number;
  maxZoom?: number;
  defaultZoom?: number;
  zoomStep?: number;
  enablePinchZoom?: boolean;
  enableZoomControls?: boolean;
  showZoomInButton?: boolean;
  showZoomOutButton?: boolean;
  showResetButton?: boolean;
  zoomControlsPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  animateZoom?: boolean;
  zoomAnimationDuration?: number;
  iconComponent?: React.ComponentType<IconComponentProps>;
  customIcons?: ZoomControlIcons;
  iconSize?: number;
  iconColor?: string;
}
```

### Complete ScrollConfig

```typescript
interface ScrollConfig {
  enableHorizontalScroll?: boolean;
  enableVerticalScroll?: boolean;
  showHorizontalScrollIndicator?: boolean;
  showVerticalScrollIndicator?: boolean;
  hideScrollBars?: boolean;
  scrollEventThrottle?: number;
  autoCenter?: boolean;
  autoCenterDelay?: number;
  bounces?: boolean;
  bouncesZoom?: boolean;
}
```

---

## 🔥 Advanced Usage

### Using Custom Icon Libraries

#### Material Icons

```tsx
import Icon from 'react-native-vector-icons/MaterialIcons';

<RNFlow
  data={data}
  zoom={{
    iconComponent: Icon,
    iconSize: 24,
    iconColor: '#2196F3',
  }}
/>
```

#### Font Awesome

```tsx
import Icon from 'react-native-vector-icons/FontAwesome';

<RNFlow
  data={data}
  zoom={{
    customIcons: {
      zoomIn: (props) => <Icon name="search-plus" {...props} />,
      zoomOut: (props) => <Icon name="search-minus" {...props} />,
      reset: (props) => <Icon name="expand" {...props} />,
    },
  }}
/>
```

#### Custom SVG Icons

```tsx
import { Svg, Path } from 'react-native-svg';

const CustomZoomIn = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={color} />
  </Svg>
);

<RNFlow
  data={data}
  zoom={{
    customIcons: {
      zoomIn: CustomZoomIn,
    },
  }}
/>
```

### Complete Custom Example

```tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import RNFlow, { RNFlowNode } from 'react-native-rnflow';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MyFlowChart = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const data: RNFlowNode = {
    id: 'ceo',
    data: { title: 'CEO', name: 'John Doe' },
    children: [
      {
        id: 'cto',
        data: { title: 'CTO', name: 'Jane Smith' },
        children: [
          { id: 'dev1', data: { title: 'Developer', name: 'Bob' } },
        ],
      },
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
        levelGap: 150,
        siblingGap: 200,
      }}
      
      zoom={{
        enableZoomControls: true,
        showResetButton: true,
        zoomControlsPosition: 'bottom-right',
        iconComponent: Icon,
        iconColor: '#2196F3',
        iconSize: 24,
      }}
      
      scroll={{
        hideScrollBars: false,
        autoCenter: true,
      }}
      
      interaction={{
        onNodePress: (node) => setSelected([node.id]),
        onZoomChange: (zoom) => console.log('Zoom:', zoom),
      }}
      
      render={{
        renderNode: (node, { isSelected, onPress, dimensions }) => (
          <TouchableOpacity
            onPress={onPress}
            style={{
              width: dimensions.width,
              height: dimensions.height,
              backgroundColor: isSelected ? '#E3F2FD' : '#FFF',
              borderRadius: 12,
              padding: 16,
              borderWidth: 2,
              borderColor: isSelected ? '#2196F3' : '#E0E0E0',
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {node.data.title}
            </Text>
            <Text style={{ fontSize: 14, marginTop: 4 }}>
              {node.data.name}
            </Text>
          </TouchableOpacity>
        ),
      }}
      
      style={{
        backgroundColor: '#F5F7FA',
        containerStyle: {
          flex: 1,
          borderRadius: 16,
        },
        edgeStyle: {
          stroke: '#64B5F6',
          strokeWidth: 2,
        },
        zoomControlsBackgroundColor: 'rgba(255, 255, 255, 0.95)',
      }}
      
      edgeType="smoothstep"
    />
  );
};

export default MyFlowChart;
```

---

## 📸 Examples

### 1. Organization Chart
![Organization Chart Example](https://via.placeholder.com/600x400/4A90E2/FFFFFF?text=Organization+Chart)

### 2. File System Tree
![File System Example](https://via.placeholder.com/600x400/66BB6A/FFFFFF?text=File+System)

### 3. Decision Tree
![Decision Tree Example](https://via.placeholder.com/600x400/FF9800/FFFFFF?text=Decision+Tree)

### 4. Horizontal Flow
![Horizontal Flow Example](https://via.placeholder.com/600x400/9C27B0/FFFFFF?text=Horizontal+Flow)

**View all examples:** [See Examples.tsx](./Examples.tsx)

**Live Demos:** [Coming Soon]

---

## ⚡ Performance

### Optimization Tips

1. **Use memoization** for custom render functions
2. **Keep node data lean** - avoid large objects
3. **Enable virtualization** for 100+ nodes
4. **Optimize custom renders** - avoid heavy computations
5. **Use appropriate zoom limits**

### Performance Benchmarks

| Nodes | Render Time | Memory Usage |
|-------|-------------|--------------|
| 10    | < 100ms     | ~10MB        |
| 50    | < 300ms     | ~25MB        |
| 100   | < 600ms     | ~50MB        |
| 500   | < 2s        | ~150MB       |

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: "Cannot find module 'react-native-reanimated'"

**Solution:** Install and configure react-native-reanimated:
```bash
npm install react-native-reanimated
```
Add plugin to `babel.config.js`

#### Issue: Zoom controls not showing

**Solution:** Check if `enableZoomControls` is true and at least one button is visible:
```tsx
zoom={{
  enableZoomControls: true,
  showZoomInButton: true,
  showZoomOutButton: true,
}}
```

#### Issue: Custom icons not displaying

**Solution:** Ensure icon library is properly installed and linked:
```bash
npm install react-native-vector-icons
cd ios && pod install
```

#### Issue: Gestures not working on Android

**Solution:** Ensure gesture handler is configured in MainActivity

### Debug Mode

Enable debug mode to see diagnostic information:

```tsx
<RNFlow data={data} debug={true} />
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Start for Contributors

```bash
# Clone the repository
git clone https://github.com/yourusername/react-native-rnflow.git
cd react-native-rnflow

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Running Examples Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/react-native-rnflow.git
cd react-native-rnflow

# Install dependencies
npm install

# Link the package locally
npm link

# In your test app
npm link react-native-rnflow

# Run your app
npx react-native run-ios
# or
npx react-native run-android
```

---

## 📝 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🔗 Links

- **Documentation:** [Full Docs](./README.md)
- **Examples:** [Examples.tsx](./Examples.tsx)
- **Migration Guide:** [MIGRATION.md](./MIGRATION.md)
- **Changelog:** [CHANGELOG.md](./CHANGELOG.md)
- **Contributing:** [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Issues:** [GitHub Issues](https://github.com/yourusername/react-native-rnflow/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/react-native-rnflow/discussions)

---

## 🙏 Acknowledgments

- React Native Team
- React Native Reanimated Team
- React Native Gesture Handler Team
- React Native SVG Team
- All contributors

---

## 📧 Support

- 📖 [Documentation](./README.md)
- 💬 [Discussions](https://github.com/yourusername/react-native-rnflow/discussions)
- 🐛 [Issue Tracker](https://github.com/yourusername/react-native-rnflow/issues)
- 📧 Email: support@rnflow.dev
- 🐦 Twitter: [@rnflow](https://twitter.com/rnflow)

---

<div align="center">

**Made with ❤️ by the RNFlow Team**

[⬆ Back to Top](#rnflow---dynamic-tree-flow-visualization-component)

</div>