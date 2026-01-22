import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RNFlow, { RNFlowNode } from './RNFlow';

// ==================== EXAMPLE 1: Organization Chart ====================

interface Employee {
  title: string;
  name: string;
  department: string;
  email?: string;
}

export const organizationData: RNFlowNode<Employee> = {
  id: 'ceo',
  data: {
    title: 'CEO',
    name: 'John Smith',
    department: 'Executive',
    email: 'john.smith@company.com',
  },
  children: [
    {
      id: 'cto',
      data: {
        title: 'CTO',
        name: 'Sarah Johnson',
        department: 'Technology',
      },
      children: [
        {
          id: 'dev-lead-1',
          data: {
            title: 'Dev Lead',
            name: 'Mike Chen',
            department: 'Engineering',
          },
          children: [
            {
              id: 'dev-1',
              data: {
                title: 'Senior Developer',
                name: 'Alex Kumar',
                department: 'Engineering',
              },
            },
            {
              id: 'dev-2',
              data: {
                title: 'Developer',
                name: 'Jessica Lee',
                department: 'Engineering',
              },
            },
          ],
        },
        {
          id: 'qa-lead',
          data: {
            title: 'QA Lead',
            name: 'Emma Davis',
            department: 'Quality',
          },
          children: [
            {
              id: 'qa-1',
              data: {
                title: 'QA Engineer',
                name: 'Tom Wilson',
                department: 'Quality',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'cfo',
      data: {
        title: 'CFO',
        name: 'Robert Brown',
        department: 'Finance',
      },
      children: [
        {
          id: 'accountant',
          data: {
            title: 'Senior Accountant',
            name: 'Lisa Wang',
            department: 'Accounting',
          },
        },
        {
          id: 'analyst',
          data: {
            title: 'Financial Analyst',
            name: 'David Martinez',
            department: 'Finance',
          },
        },
      ],
    },
    {
      id: 'cmo',
      data: {
        title: 'CMO',
        name: 'Jennifer Taylor',
        department: 'Marketing',
      },
      children: [
        {
          id: 'marketing-lead',
          data: {
            title: 'Marketing Lead',
            name: 'Chris Anderson',
            department: 'Marketing',
          },
        },
      ],
    },
  ],
};

export function OrganizationChartExample() {
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);

  return (
    <RNFlow<Employee>
      data={organizationData}
      selectedNodeIds={selectedNodeIds}
      layout={{
        direction: 'vertical',
        nodeWidth: 200,
        nodeHeight: 120,
        levelGap: 160,
        siblingGap: 220,
      }}
      zoom={{
        minZoom: 0.3,
        maxZoom: 2,
        defaultZoom: 0.8,
        zoomControlsPosition: 'top-right',
      }}
      edgeType="smoothstep"
      interaction={{
        onNodePress: (node) => {
          setSelectedNodeIds([node.id]);
        },
      }}
      render={{
        renderNode: (node, { isSelected, onPress, dimensions }) => (
          <TouchableOpacity
            onPress={onPress}
            style={[
              exampleStyles.orgNode,
              {
                width: dimensions.width,
                height: dimensions.height,
                borderColor: isSelected ? '#2196F3' : '#E0E0E0',
                backgroundColor: isSelected ? '#E3F2FD' : '#FFFFFF',
              },
            ]}
          >
            <View style={exampleStyles.orgNodeHeader}>
              <Text style={exampleStyles.orgTitle}>{node.data.title}</Text>
            </View>
            <Text style={exampleStyles.orgName}>{node.data.name}</Text>
            <Text style={exampleStyles.orgDepartment}>{node.data.department}</Text>
          </TouchableOpacity>
        ),
      }}
      style={{
        backgroundColor: '#F5F7FA',
        edgeStyle: {
          stroke: '#64B5F6',
          strokeWidth: 2,
        },
      }}
    />
  );
}

// ==================== EXAMPLE 2: File System Tree ====================

interface FileSystemNode {
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified?: string;
}

const fileSystemData: RNFlowNode<FileSystemNode> = {
  id: 'root',
  data: {
    name: 'My Project',
    type: 'folder',
  },
  children: [
    {
      id: 'src',
      data: {
        name: 'src',
        type: 'folder',
      },
      children: [
        {
          id: 'components',
          data: {
            name: 'components',
            type: 'folder',
          },
          children: [
            {
              id: 'button.tsx',
              data: {
                name: 'Button.tsx',
                type: 'file',
                size: '2.4 KB',
              },
            },
            {
              id: 'input.tsx',
              data: {
                name: 'Input.tsx',
                type: 'file',
                size: '3.1 KB',
              },
            },
          ],
        },
        {
          id: 'utils',
          data: {
            name: 'utils',
            type: 'folder',
          },
          children: [
            {
              id: 'helpers.ts',
              data: {
                name: 'helpers.ts',
                type: 'file',
                size: '1.8 KB',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'public',
      data: {
        name: 'public',
        type: 'folder',
      },
      children: [
        {
          id: 'index.html',
          data: {
            name: 'index.html',
            type: 'file',
            size: '0.5 KB',
          },
        },
      ],
    },
    {
      id: 'package.json',
      data: {
        name: 'package.json',
        type: 'file',
        size: '1.2 KB',
      },
    },
  ],
};

export function FileSystemExample() {
  return (
    <RNFlow<FileSystemNode>
      data={fileSystemData}
      layout={{
        direction: 'horizontal',
        nodeWidth: 160,
        nodeHeight: 80,
        levelGap: 180,
        siblingGap: 100,
      }}
      edgeType="step"
      render={{
        renderNode: (node, { onPress, dimensions }) => (
          <TouchableOpacity
            onPress={onPress}
            style={[
              exampleStyles.fileNode,
              {
                width: dimensions.width,
                height: dimensions.height,
                backgroundColor: node.data.type === 'folder' ? '#FFF3E0' : '#E8F5E9',
              },
            ]}
          >
            <Text style={exampleStyles.fileIcon}>
              {node.data.type === 'folder' ? '📁' : '📄'}
            </Text>
            <Text style={exampleStyles.fileName} numberOfLines={1}>
              {node.data.name}
            </Text>
            {node.data.size && (
              <Text style={exampleStyles.fileSize}>{node.data.size}</Text>
            )}
          </TouchableOpacity>
        ),
      }}
      style={{
        edgeStyle: {
          stroke: '#9E9E9E',
          strokeWidth: 1.5,
        },
      }}
    />
  );
}

// ==================== EXAMPLE 3: Decision Tree ====================

interface Decision {
  question: string;
  answer?: string;
  isEndNode?: boolean;
}

export const decisionTreeData: RNFlowNode<Decision> = {
  id: 'start',
  data: {
    question: 'Do you like programming?',
  },
  children: [
    {
      id: 'yes-programming',
      data: {
        question: 'Do you prefer frontend or backend?',
        answer: 'Yes',
      },
      children: [
        {
          id: 'frontend',
          data: {
            question: 'Learn React Native!',
            answer: 'Frontend',
            isEndNode: true,
          },
        },
        {
          id: 'backend',
          data: {
            question: 'Learn Node.js!',
            answer: 'Backend',
            isEndNode: true,
          },
        },
      ],
    },
    {
      id: 'no-programming',
      data: {
        question: 'Do you like design?',
        answer: 'No',
      },
      children: [
        {
          id: 'yes-design',
          data: {
            question: 'Learn Figma!',
            answer: 'Yes',
            isEndNode: true,
          },
        },
        {
          id: 'no-design',
          data: {
            question: 'Explore more options!',
            answer: 'No',
            isEndNode: true,
          },
        },
      ],
    },
  ],
};

export function DecisionTreeExample() {
  const [selectedPath, setSelectedPath] = useState<string[]>([]);

  return (
    <RNFlow<Decision>
      data={decisionTreeData}
      selectedNodeIds={selectedPath}
      layout={{
        direction: 'vertical',
        nodeWidth: 180,
        nodeHeight: 100,
        levelGap: 140,
        siblingGap: 200,
      }}
      edgeType="curved"
      interaction={{
        onNodePress: (node) => {
          // Build path to clicked node
          const path: string[] = [];
          const findPath = (n: RNFlowNode<Decision>, targetId: string): boolean => {
            path.push(n.id);
            if (n.id === targetId) return true;
            if (n.children) {
              for (const child of n.children) {
                if (findPath(child, targetId)) return true;
              }
            }
            path.pop();
            return false;
          };
          findPath(decisionTreeData, node.id);
          setSelectedPath(path);
        },
      }}
      render={{
        renderNode: (node, { isSelected, onPress, dimensions }) => (
          <TouchableOpacity
            onPress={onPress}
            style={[
              exampleStyles.decisionNode,
              {
                width: dimensions.width,
                height: dimensions.height,
                backgroundColor: node.data.isEndNode
                  ? isSelected
                    ? '#C8E6C9'
                    : '#E8F5E9'
                  : isSelected
                  ? '#BBDEFB'
                  : '#FFFFFF',
                borderColor: node.data.isEndNode ? '#4CAF50' : '#2196F3',
              },
            ]}
          >
            {node.data.answer && (
              <View style={exampleStyles.answerBadge}>
                <Text style={exampleStyles.answerText}>{node.data.answer}</Text>
              </View>
            )}
            <Text style={exampleStyles.questionText} numberOfLines={3}>
              {node.data.question}
            </Text>
          </TouchableOpacity>
        ),
      }}
      style={{
        backgroundColor: '#FAFAFA',
        edgeStyle: {
          stroke: '#90CAF9',
          strokeWidth: 3,
        },
      }}
    />
  );
}

// ==================== EXAMPLE 4: Simple Minimal Example ====================

export const simpleData: RNFlowNode = {
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
      children: [
        { id: '6', data: { title: 'Grandchild 3' } },
      ],
    },
  ],
};

export function SimpleExample() {
  return (
    <RNFlow
      data={simpleData}
      layout={{
        direction: 'vertical',
        nodeWidth: 120,
        nodeHeight: 60,
      }}
      zoom={{
        enableZoomControls: true,
      }}
    />
  );
}

// ==================== EXAMPLE 5: Horizontal Flow ====================

export function HorizontalFlowExample() {
  return (
    <RNFlow
      data={simpleData}
      layout={{
        direction: 'horizontal',
        nodeWidth: 140,
        nodeHeight: 80,
        levelGap: 200,
        siblingGap: 120,
      }}
      edgeType="smoothstep"
      style={{
        backgroundColor: '#ECEFF1',
        edgeStyle: {
          stroke: '#607D8B',
          strokeWidth: 2,
        },
        nodeStyle: {
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        },
      }}
    />
  );
}

// ==================== STYLES ====================

const exampleStyles = StyleSheet.create({
  // Organization Chart Styles
  orgNode: {
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  orgNodeHeader: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    width: '100%',
    alignItems: 'center',
  },
  orgTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  orgName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  orgDepartment: {
    fontSize: 12,
    color: '#757575',
  },

  // File System Styles
  fileNode: {
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  fileIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    textAlign: 'center',
  },
  fileSize: {
    fontSize: 11,
    color: '#9E9E9E',
    marginTop: 4,
  },

  // Decision Tree Styles
  decisionNode: {
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  answerBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  answerText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  questionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    textAlign: 'center',
  },
});

// Export all examples
export default {
  OrganizationChartExample,
  FileSystemExample,
  DecisionTreeExample,
  SimpleExample,
  HorizontalFlowExample,
};