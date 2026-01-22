import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import RNFlow, { RNFlowNode } from './RNFlow';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { decisionTreeData, organizationData, simpleData } from './Example';
import { Circle, Path } from 'react-native-svg';

// ==================== EXAMPLE 6: Family Tree ====================

interface FamilyMember {
  name: string;
  birthYear: number;
  gender: 'male' | 'female';
  isAlive: boolean;
  photo?: string;
}

const familyTreeData: RNFlowNode<FamilyMember> = {
  id: 'grandpa',
  data: {
    name: 'George Smith',
    birthYear: 1940,
    gender: 'male',
    isAlive: false,
  },
  children: [
    {
      id: 'father',
      data: {
        name: 'John Smith',
        birthYear: 1965,
        gender: 'male',
        isAlive: true,
      },
      children: [
        {
          id: 'child1',
          data: {
            name: 'Michael Smith',
            birthYear: 1995,
            gender: 'male',
            isAlive: true,
          },
        },
        {
          id: 'child2',
          data: {
            name: 'Emma Smith',
            birthYear: 1998,
            gender: 'female',
            isAlive: true,
          },
        },
      ],
    },
    {
      id: 'uncle',
      data: {
        name: 'Robert Smith',
        birthYear: 1968,
        gender: 'male',
        isAlive: true,
      },
      children: [
        {
          id: 'cousin',
          data: {
            name: 'Sarah Smith',
            birthYear: 2000,
            gender: 'female',
            isAlive: true,
          },
        },
      ],
    },
  ],
};

export function FamilyTreeExample() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <RNFlow<FamilyMember>
      data={familyTreeData}
      selectedNodeIds={selected}
      layout={{
        direction: 'vertical',
        nodeWidth: 160,
        nodeHeight: 140,
        levelGap: 180,
        siblingGap: 180,
      }}
      zoom={{
        minZoom: 0.5,
        maxZoom: 2,
        iconComponent: Icon,
        iconColor: '#8B4513',
        iconSize: 22,
      }}
      edgeType="curved"
      interaction={{
        onNodePress: (node) => setSelected([node.id]),
        onNodeLongPress: (node) => {
          Alert.alert(
            node.data.name,
            `Born: ${node.data.birthYear}\nAge: ${2024 - node.data.birthYear}\nStatus: ${
              node.data.isAlive ? 'Living' : 'Deceased'
            }`
          );
        },
      }}
      render={{
        renderNode: (node, { isSelected, onPress, onLongPress, dimensions }) => (
          <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              advancedStyles.familyNode,
              {
                width: dimensions.width,
                height: dimensions.height,
                borderColor: isSelected ? '#D4AF37' : '#D2B48C',
                backgroundColor: node.data.gender === 'male' ? '#E3F2FD' : '#FCE4EC',
              },
            ]}
          >
            <View
              style={[
                advancedStyles.familyAvatar,
                { backgroundColor: node.data.gender === 'male' ? '#2196F3' : '#E91E63' },
              ]}
            >
              <Icon
                name={node.data.gender === 'male' ? 'man' : 'woman'}
                size={32}
                color="#FFF"
              />
            </View>
            <Text style={advancedStyles.familyName}>{node.data.name}</Text>
            <Text style={advancedStyles.familyYear}>b. {node.data.birthYear}</Text>
            {!node.data.isAlive && (
              <Text style={advancedStyles.deceasedBadge}>†</Text>
            )}
          </TouchableOpacity>
        ),
      }}
      style={{
        backgroundColor: '#FFF8DC',
        edgeStyle: {
          stroke: '#8B4513',
          strokeWidth: 2,
        },
      }}
    />
  );
}

// ==================== EXAMPLE 7: Project Roadmap / Timeline ====================

interface Milestone {
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  date: string;
  team: string;
  priority: 'high' | 'medium' | 'low';
}

const roadmapData: RNFlowNode<Milestone> = {
  id: 'q1',
  data: {
    title: 'Q1 Planning',
    status: 'completed',
    date: 'Jan 2024',
    team: 'Management',
    priority: 'high',
  },
  children: [
    {
      id: 'design',
      data: {
        title: 'Design Phase',
        status: 'completed',
        date: 'Feb 2024',
        team: 'Design',
        priority: 'high',
      },
      children: [
        {
          id: 'prototype',
          data: {
            title: 'Prototype',
            status: 'completed',
            date: 'Mar 2024',
            team: 'Design',
            priority: 'medium',
          },
        },
        {
          id: 'user-testing',
          data: {
            title: 'User Testing',
            status: 'in-progress',
            date: 'Apr 2024',
            team: 'QA',
            priority: 'high',
          },
        },
      ],
    },
    {
      id: 'development',
      data: {
        title: 'Development',
        status: 'in-progress',
        date: 'Mar 2024',
        team: 'Engineering',
        priority: 'high',
      },
      children: [
        {
          id: 'backend',
          data: {
            title: 'Backend API',
            status: 'in-progress',
            date: 'Apr 2024',
            team: 'Backend',
            priority: 'high',
          },
        },
        {
          id: 'frontend',
          data: {
            title: 'Frontend UI',
            status: 'pending',
            date: 'May 2024',
            team: 'Frontend',
            priority: 'medium',
          },
        },
      ],
    },
    {
      id: 'launch',
      data: {
        title: 'Launch Prep',
        status: 'pending',
        date: 'Jun 2024',
        team: 'Marketing',
        priority: 'high',
      },
    },
  ],
};

export function ProjectRoadmapExample() {
  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'in-progress':
        return '#FF9800';
      case 'pending':
        return '#9E9E9E';
    }
  };

  const getPriorityIcon = (priority: Milestone['priority']) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
    }
  };

  return (
    <RNFlow<Milestone>
      data={roadmapData}
      layout={{
        direction: 'horizontal',
        nodeWidth: 200,
        nodeHeight: 120,
        levelGap: 220,
        siblingGap: 140,
      }}
      zoom={{
        iconComponent: FeatherIcon,
        iconColor: '#2196F3',
        showResetButton: true,
      }}
      scroll={{
        hideScrollBars: false,
      }}
      edgeType="step"
      render={{
        renderNode: (node, { onPress, dimensions }) => (
          <TouchableOpacity
            onPress={onPress}
            style={[
              advancedStyles.roadmapNode,
              {
                width: dimensions.width,
                height: dimensions.height,
                borderLeftColor: getStatusColor(node.data.status),
              },
            ]}
          >
            <View style={advancedStyles.roadmapHeader}>
              <Text style={advancedStyles.roadmapTitle}>{node.data.title}</Text>
              <Text style={advancedStyles.priorityBadge}>
                {getPriorityIcon(node.data.priority)}
              </Text>
            </View>
            <Text style={advancedStyles.roadmapDate}>{node.data.date}</Text>
            <Text style={advancedStyles.roadmapTeam}>Team: {node.data.team}</Text>
            <View
              style={[
                advancedStyles.statusBadge,
                { backgroundColor: getStatusColor(node.data.status) },
              ]}
            >
              <Text style={advancedStyles.statusText}>
                {node.data.status.replace('-', ' ').toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        ),
      }}
      style={{
        backgroundColor: '#F5F5F5',
        edgeStyle: {
          stroke: '#BDBDBD',
          strokeWidth: 2,
          strokeDasharray: '5,5',
        },
      }}
    />
  );
}

// ==================== EXAMPLE 8: Knowledge Graph / Mind Map ====================

interface Concept {
  concept: string;
  category: 'core' | 'feature' | 'tool' | 'skill';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
}

const knowledgeGraphData: RNFlowNode<Concept> = {
  id: 'react-native',
  data: {
    concept: 'React Native',
    category: 'core',
    difficulty: 'intermediate',
    icon: '⚛️',
  },
  children: [
    {
      id: 'components',
      data: {
        concept: 'Components',
        category: 'core',
        difficulty: 'beginner',
        icon: '🧩',
      },
      children: [
        {
          id: 'functional',
          data: {
            concept: 'Functional',
            category: 'feature',
            difficulty: 'beginner',
            icon: '📦',
          },
        },
        {
          id: 'class',
          data: {
            concept: 'Class',
            category: 'feature',
            difficulty: 'intermediate',
            icon: '🏛️',
          },
        },
      ],
    },
    {
      id: 'hooks',
      data: {
        concept: 'Hooks',
        category: 'feature',
        difficulty: 'intermediate',
        icon: '🪝',
      },
      children: [
        {
          id: 'usestate',
          data: {
            concept: 'useState',
            category: 'tool',
            difficulty: 'beginner',
            icon: '💾',
          },
        },
        {
          id: 'useeffect',
          data: {
            concept: 'useEffect',
            category: 'tool',
            difficulty: 'intermediate',
            icon: '⚡',
          },
        },
        {
          id: 'custom-hooks',
          data: {
            concept: 'Custom Hooks',
            category: 'skill',
            difficulty: 'advanced',
            icon: '🎯',
          },
        },
      ],
    },
    {
      id: 'navigation',
      data: {
        concept: 'Navigation',
        category: 'feature',
        difficulty: 'intermediate',
        icon: '🧭',
      },
      children: [
        {
          id: 'stack',
          data: {
            concept: 'Stack',
            category: 'tool',
            difficulty: 'beginner',
            icon: '📚',
          },
        },
        {
          id: 'tabs',
          data: {
            concept: 'Tabs',
            category: 'tool',
            difficulty: 'beginner',
            icon: '📑',
          },
        },
      ],
    },
  ],
};

export function KnowledgeGraphExample() {
  const getCategoryColor = (category: Concept['category']) => {
    switch (category) {
      case 'core':
        return '#2196F3';
      case 'feature':
        return '#4CAF50';
      case 'tool':
        return '#FF9800';
      case 'skill':
        return '#9C27B0';
    }
  };

  return (
    <RNFlow<Concept>
      data={knowledgeGraphData}
      layout={{
        direction: 'vertical',
        nodeWidth: 140,
        nodeHeight: 100,
        levelGap: 150,
        siblingGap: 160,
      }}
      zoom={{
        customIcons: {
          zoomIn: (props) => <Icon name="add-circle" {...props} />,
          zoomOut: (props) => <Icon name="remove-circle" {...props} />,
          reset: (props) => <Icon name="center-focus-strong" {...props} />,
        },
        iconSize: 28,
        iconColor: '#9C27B0',
      }}
      edgeType="curved"
      render={{
        renderNode: (node, { onPress, dimensions }) => (
          <TouchableOpacity
            onPress={onPress}
            style={[
              advancedStyles.conceptNode,
              {
                width: dimensions.width,
                height: dimensions.height,
                borderColor: getCategoryColor(node.data.category),
              },
            ]}
          >
            <Text style={advancedStyles.conceptIcon}>{node.data.icon}</Text>
            <Text style={advancedStyles.conceptText}>{node.data.concept}</Text>
            <View
              style={[
                advancedStyles.categoryBadge,
                { backgroundColor: getCategoryColor(node.data.category) },
              ]}
            >
              <Text style={advancedStyles.categoryText}>{node.data.category}</Text>
            </View>
          </TouchableOpacity>
        ),
      }}
      style={{
        backgroundColor: '#FAFAFA',
        edgeStyle: {
          stroke: '#9C27B0',
          strokeWidth: 2,
          opacity: 0.6,
        },
      }}
    />
  );
}

// ==================== EXAMPLE 9: Network/Infrastructure Diagram ====================

interface NetworkNode {
  name: string;
  type: 'server' | 'database' | 'service' | 'client';
  status: 'online' | 'offline' | 'warning';
  ip?: string;
  connections?: number;
}

const networkData: RNFlowNode<NetworkNode> = {
  id: 'load-balancer',
  data: {
    name: 'Load Balancer',
    type: 'server',
    status: 'online',
    ip: '10.0.0.1',
    connections: 1250,
  },
  children: [
    {
      id: 'web-server-1',
      data: {
        name: 'Web Server 1',
        type: 'server',
        status: 'online',
        ip: '10.0.1.10',
        connections: 420,
      },
      children: [
        {
          id: 'api-service',
          data: {
            name: 'API Service',
            type: 'service',
            status: 'online',
            ip: '10.0.2.20',
          },
        },
        {
          id: 'cache',
          data: {
            name: 'Redis Cache',
            type: 'database',
            status: 'online',
            ip: '10.0.2.30',
          },
        },
      ],
    },
    {
      id: 'web-server-2',
      data: {
        name: 'Web Server 2',
        type: 'server',
        status: 'warning',
        ip: '10.0.1.11',
        connections: 830,
      },
      children: [
        {
          id: 'database',
          data: {
            name: 'PostgreSQL',
            type: 'database',
            status: 'online',
            ip: '10.0.3.10',
          },
        },
      ],
    },
  ],
};

export function NetworkDiagramExample() {
  const getStatusColor = (status: NetworkNode['status']) => {
    switch (status) {
      case 'online':
        return '#4CAF50';
      case 'offline':
        return '#F44336';
      case 'warning':
        return '#FF9800';
    }
  };

  const getTypeIcon = (type: NetworkNode['type']) => {
    switch (type) {
      case 'server':
        return 'dns';
      case 'database':
        return 'storage';
      case 'service':
        return 'settings';
      case 'client':
        return 'computer';
    }
  };

  return (
    <RNFlow<NetworkNode>
      data={networkData}
      layout={{
        direction: 'vertical',
        nodeWidth: 180,
        nodeHeight: 110,
        levelGap: 160,
        siblingGap: 200,
      }}
      zoom={{
        iconComponent: Icon,
        iconColor: '#00BCD4',
      }}
      scroll={{
        hideScrollBars: true,
      }}
      edgeType="step"
      render={{
        renderNode: (node, { onPress, dimensions }) => (
          <TouchableOpacity
            onPress={onPress}
            style={[
              advancedStyles.networkNode,
              {
                width: dimensions.width,
                height: dimensions.height,
              },
            ]}
          >
            <View style={advancedStyles.networkHeader}>
              <Icon name={getTypeIcon(node.data.type)} size={24} color="#00BCD4" />
              <View
                style={[
                  advancedStyles.statusIndicator,
                  { backgroundColor: getStatusColor(node.data.status) },
                ]}
              />
            </View>
            <Text style={advancedStyles.networkName}>{node.data.name}</Text>
            {node.data.ip && (
              <Text style={advancedStyles.networkIP}>{node.data.ip}</Text>
            )}
            {node.data.connections !== undefined && (
              <Text style={advancedStyles.networkConnections}>
                {node.data.connections} conn.
              </Text>
            )}
          </TouchableOpacity>
        ),
      }}
      style={{
        backgroundColor: '#263238',
        edgeStyle: {
          stroke: '#00BCD4',
          strokeWidth: 2,
        },
      }}
    />
  );
}

// ==================== EXAMPLE 10: Shopping Category Tree ====================

interface Category {
  name: string;
  itemCount: number;
  icon: string;
  discount?: number;
}

const categoryData: RNFlowNode<Category> = {
  id: 'all',
  data: {
    name: 'All Products',
    itemCount: 15420,
    icon: '🏪',
  },
  children: [
    {
      id: 'electronics',
      data: {
        name: 'Electronics',
        itemCount: 5230,
        icon: '💻',
        discount: 15,
      },
      children: [
        {
          id: 'phones',
          data: {
            name: 'Phones',
            itemCount: 1250,
            icon: '📱',
            discount: 20,
          },
        },
        {
          id: 'laptops',
          data: {
            name: 'Laptops',
            itemCount: 890,
            icon: '💼',
            discount: 10,
          },
        },
        {
          id: 'accessories',
          data: {
            name: 'Accessories',
            itemCount: 3090,
            icon: '🎧',
          },
        },
      ],
    },
    {
      id: 'fashion',
      data: {
        name: 'Fashion',
        itemCount: 6800,
        icon: '👔',
        discount: 25,
      },
      children: [
        {
          id: 'mens',
          data: {
            name: "Men's Wear",
            itemCount: 3200,
            icon: '👕',
          },
        },
        {
          id: 'womens',
          data: {
            name: "Women's Wear",
            itemCount: 3600,
            icon: '👗',
            discount: 30,
          },
        },
      ],
    },
    {
      id: 'home',
      data: {
        name: 'Home & Living',
        itemCount: 3390,
        icon: '🏠',
      },
    },
  ],
};

export function ShoppingCategoryExample() {
  return (
    <RNFlow<Category>
      data={categoryData}
      layout={{
        direction: 'vertical',
        nodeWidth: 160,
        nodeHeight: 120,
        levelGap: 140,
        siblingGap: 180,
      }}
      zoom={{
        defaultZoom: 0.9,
        iconComponent: Icon,
        iconColor: '#E91E63',
      }}
      edgeType="smoothstep"
      render={{
        renderNode: (node, { onPress, dimensions }) => (
          <TouchableOpacity
            onPress={onPress}
            style={[
              advancedStyles.categoryNode,
              {
                width: dimensions.width,
                height: dimensions.height,
              },
            ]}
          >
            {node.data.discount && (
              <View style={advancedStyles.discountBadge}>
                <Text style={advancedStyles.discountText}>{node.data.discount}% OFF</Text>
              </View>
            )}
            <Text style={advancedStyles.categoryIcon}>{node.data.icon}</Text>
            <Text style={advancedStyles.categoryName}>{node.data.name}</Text>
            <Text style={advancedStyles.itemCount}>
              {node.data.itemCount.toLocaleString()} items
            </Text>
          </TouchableOpacity>
        ),
      }}
      style={{
        backgroundColor: '#FFF',
        edgeStyle: {
          stroke: '#E91E63',
          strokeWidth: 2,
        },
      }}
    />
  );
}

// ==================== EXAMPLE 11: Dark Theme with Custom Zoom Controls ====================

export function DarkThemeExample() {
  const [zoom, setZoom] = useState(1);

  return (
    <RNFlow
      data={familyTreeData}
      layout={{
        direction: 'horizontal',
        nodeWidth: 150,
        nodeHeight: 100,
      }}
      zoom={{
        enableZoomControls: true,
        zoomControlsPosition: 'bottom-right',
      }}
      scroll={{
        hideScrollBars: true,
      }}
      interaction={{
        onZoomChange: (z) => setZoom(z),
      }}
      render={{
        renderZoomControls: (zoomIn, zoomOut, currentZoom) => (
          <View style={advancedStyles.customZoomControls}>
            <TouchableOpacity onPress={zoomOut} style={advancedStyles.zoomButton}>
              <Text style={advancedStyles.zoomButtonText}>−</Text>
            </TouchableOpacity>
            <View style={advancedStyles.zoomDisplay}>
              <Text style={advancedStyles.zoomText}>{Math.round(currentZoom * 100)}%</Text>
            </View>
            <TouchableOpacity onPress={zoomIn} style={advancedStyles.zoomButton}>
              <Text style={advancedStyles.zoomButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ),
      }}
      style={{
        backgroundColor: '#1E1E1E',
        canvasBackgroundColor: '#2D2D2D',
        nodeStyle: {
          backgroundColor: '#3A3A3A',
          borderColor: '#555',
          borderWidth: 1,
          borderRadius: 12,
        },
        edgeStyle: {
          stroke: '#666',
          strokeWidth: 2,
        },
      }}
      edgeType="curved"
    />
  );
}

// ==================== EXAMPLE 12: Multi-Select with Actions ====================

export function MultiSelectExample() {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  const handleNodePress = useCallback((node: RNFlowNode) => {
    setSelectedNodes((prev) => {
      if (prev.includes(node.id)) {
        return prev.filter((id) => id !== node.id);
      }
      return [...prev, node.id];
    });
  }, []);

  const clearSelection = () => setSelectedNodes([]);
  const selectAll = () => {
    const allIds: string[] = [];
    const collectIds = (node: RNFlowNode) => {
      allIds.push(node.id);
      node.children?.forEach(collectIds);
    };
    collectIds(organizationData);
    setSelectedNodes(allIds);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={advancedStyles.actionBar}>
        <Text style={advancedStyles.selectionCount}>
          Selected: {selectedNodes.length}
        </Text>
        <TouchableOpacity onPress={selectAll} style={advancedStyles.actionButton}>
          <Text style={advancedStyles.actionButtonText}>Select All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearSelection} style={advancedStyles.actionButton}>
          <Text style={advancedStyles.actionButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <RNFlow
        data={organizationData}
        selectedNodeIds={selectedNodes}
        interaction={{
          multiSelect: true,
          onNodePress: handleNodePress,
        }}
        layout={{
          direction: 'vertical',
          nodeWidth: 140,
          nodeHeight: 80,
        }}
        style={{
          backgroundColor: '#F5F5F5',
        }}
      />
    </View>
  );
}

// ==================== EXAMPLE 13: Minimalist Style ====================

export function MinimalistExample() {
  return (
    <RNFlow
      data={simpleData}
      layout={{
        direction: 'vertical',
        nodeWidth: 100,
        nodeHeight: 50,
        levelGap: 100,
        siblingGap: 120,
      }}
      zoom={{
        showZoomInButton: false,
        showZoomOutButton: false,
        showResetButton: false,
      }}
      scroll={{
        hideScrollBars: true,
      }}
      style={{
        backgroundColor: '#FFFFFF',
        nodeStyle: {
          backgroundColor: '#000',
          borderRadius: 4,
        },
        edgeStyle: {
          stroke: '#000',
          strokeWidth: 1,
        },
      }}
      edgeType="straight"
      render={{
        renderNode: (node, { onPress, dimensions }) => (
          <TouchableOpacity
            onPress={onPress}
            style={{
              width: dimensions.width,
              height: dimensions.height,
              backgroundColor: '#000',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>
              {node.data.title}
            </Text>
          </TouchableOpacity>
        ),
      }}
    />
  );
}

// ==================== EXAMPLE 14: With Custom Edge Rendering ====================

export function CustomEdgeExample() {
  return (
    <RNFlow
      data={decisionTreeData}
      layout={{
        direction: 'vertical',
        nodeWidth: 150,
        nodeHeight: 80,
      }}
      render={{
        renderEdge: (parent, child, { path, style }) => (
          <>
            <Path
              d={path}
              stroke={style.stroke}
              strokeWidth={style.strokeWidth}
              fill="none"
            />
            {/* Add arrow marker */}
            <Circle
              r={4}
              fill={style.stroke}
            />
          </>
        ),
      }}
      style={{
        edgeStyle: {
          stroke: '#9C27B0',
          strokeWidth: 3,
        },
      }}
    />
  );
}

// ==================== EXAMPLE 15: Compact Mobile View ====================

export function CompactMobileExample() {
  return (
    <RNFlow
      data={simpleData}
      layout={{
        direction: 'vertical',
        nodeWidth: 90,
        nodeHeight: 50,
        levelGap: 80,
        siblingGap: 100,
        padding: 100,
      }}
      zoom={{
        defaultZoom: 1.2,
        minZoom: 0.8,
        maxZoom: 2,
        zoomControlsPosition: 'bottom-left',
        iconSize: 18,
      }}
      scroll={{
        bounces: true,
      }}
      style={{
        backgroundColor: '#F8F9FA',
        nodeStyle: {
          backgroundColor: '#FFF',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#DEE2E6',
        },
        edgeStyle: {
          stroke: '#ADB5BD',
          strokeWidth: 1.5,
        },
      }}
    />
  );
}

// ==================== STYLES ====================

const advancedStyles = StyleSheet.create({
  // Family Tree Styles
  familyNode: {
    borderRadius: 12,
    borderWidth: 3,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  familyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  familyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 4,
  },
  familyYear: {
    fontSize: 11,
    color: '#757575',
  },
  deceasedBadge: {
    fontSize: 16,
    color: '#757575',
    marginTop: 4,
  },

  // Roadmap Styles
  roadmapNode: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderLeftWidth: 4,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  roadmapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  roadmapTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
    flex: 1,
  },
  priorityBadge: {
    fontSize: 16,
  },
  roadmapDate: {
    fontSize: 11,
    color: '#757575',
    marginBottom: 4,
  },
  roadmapTeam: {
    fontSize: 11,
    color: '#9E9E9E',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF',
  },

  // Knowledge Graph Styles
  conceptNode: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  conceptIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  conceptText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFF',
    textTransform: 'uppercase',
  },

  // Network Diagram Styles
  networkNode: {
    backgroundColor: '#37474F',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#546E7A',
  },
  networkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  networkName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ECEFF1',
    marginBottom: 4,
  },
  networkIP: {
    fontSize: 11,
    color: '#90A4AE',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  networkConnections: {
    fontSize: 10,
    color: '#78909C',
  },

  // Shopping Category Styles
  categoryNode: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  discountBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#F44336',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  discountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 11,
    color: '#9E9E9E',
  },

  // Custom Zoom Controls
  customZoomControls: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 25,
    padding: 8,
    alignItems: 'center',
    gap: 12,
  },
  zoomButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  zoomDisplay: {
    paddingHorizontal: 12,
  },
  zoomText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },

  // Multi-Select Action Bar
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#2196F3',
    gap: 12,
  },
  selectionCount: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 6,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2196F3',
  },
});

// Export all advanced examples
export default {
  FamilyTreeExample,
  ProjectRoadmapExample,
  KnowledgeGraphExample,
  NetworkDiagramExample,
  ShoppingCategoryExample,
  DarkThemeExample,
  MultiSelectExample,
  MinimalistExample,
  CustomEdgeExample,
  CompactMobileExample,
};