import 'react-native-reanimated';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import Basic Examples
import {
  OrganizationChartExample,
  FileSystemExample,
  DecisionTreeExample,
  SimpleExample,
  HorizontalFlowExample,
} from './src/Example';

// Import Advanced Examples
import {
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
} from './src/ExampleAdvanced';

// Define example categories
const EXAMPLE_CATEGORIES = [
  {
    category: 'Basic Examples',
    description: 'Simple examples to get started',
    examples: [
      { key: 'simple', title: 'Simple Tree', component: SimpleExample },
      { key: 'horizontal', title: 'Horizontal Flow', component: HorizontalFlowExample },
      { key: 'decision', title: 'Decision Tree', component: DecisionTreeExample },
    ],
  },
  {
    category: 'Business & Professional',
    description: 'Examples for business use cases',
    examples: [
      { key: 'org', title: 'Organization Chart', component: OrganizationChartExample },
      { key: 'roadmap', title: 'Project Roadmap', component: ProjectRoadmapExample },
      { key: 'network', title: 'Network Diagram', component: NetworkDiagramExample },
    ],
  },
  {
    category: 'Personal & Creative',
    description: 'Examples for personal projects',
    examples: [
      { key: 'family', title: 'Family Tree', component: FamilyTreeExample },
      { key: 'filesystem', title: 'File System', component: FileSystemExample },
      { key: 'shopping', title: 'Shopping Categories', component: ShoppingCategoryExample },
    ],
  },
  {
    category: 'Educational',
    description: 'Examples for learning and teaching',
    examples: [
      { key: 'knowledge', title: 'Knowledge Graph', component: KnowledgeGraphExample },
    ],
  },
  {
    category: 'Styling & Themes',
    description: 'Different visual styles',
    examples: [
      { key: 'dark', title: 'Dark Theme', component: DarkThemeExample },
      { key: 'minimalist', title: 'Minimalist Design', component: MinimalistExample },
      { key: 'compact', title: 'Compact Mobile', component: CompactMobileExample },
    ],
  },
  {
    category: 'Advanced Features',
    description: 'Advanced customization examples',
    examples: [
      { key: 'multiselect', title: 'Multi-Select', component: MultiSelectExample },
      { key: 'customedge', title: 'Custom Edges', component: CustomEdgeExample },
    ],
  },
];

export default function App() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['Basic Examples'])
  );

  // Find the selected component
  const getSelectedComponent = () => {
    for (const category of EXAMPLE_CATEGORIES) {
      const example = category.examples.find(item => item.key === activeKey);
      if (example) return example;
    }
    return null;
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // If an example is selected, show it
  if (activeKey) {
    const selected = getSelectedComponent();
    const SelectedComponent = selected?.component;

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          
          {/* Header with back button and title */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => setActiveKey(null)}
              style={styles.backButton}
            >
              <Text style={styles.backIcon}>←</Text>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{selected?.title}</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Selected component */}
          <View style={styles.content}>
            {SelectedComponent && <SelectedComponent />}
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    );
  }

  // Show example list
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.listContainer}>
        <StatusBar barStyle="dark-content" />
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>RNFlow Examples</Text>
          <Text style={styles.subtitle}>
            Explore {EXAMPLE_CATEGORIES.reduce((sum, cat) => sum + cat.examples.length, 0)} examples
          </Text>
        </View>

        {/* Examples List */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {EXAMPLE_CATEGORIES.map((category, categoryIndex) => {
            const isExpanded = expandedCategories.has(category.category);
            
            return (
              <View key={category.category} style={styles.categoryContainer}>
                {/* Category Header */}
                <TouchableOpacity
                  style={styles.categoryHeader}
                  onPress={() => toggleCategory(category.category)}
                  activeOpacity={0.7}
                >
                  <View style={styles.categoryHeaderLeft}>
                    <Text style={styles.categoryTitle}>{category.category}</Text>
                    <Text style={styles.categoryDescription}>
                      {category.description}
                    </Text>
                  </View>
                  <Text style={styles.expandIcon}>
                    {isExpanded ? '▼' : '▶'}
                  </Text>
                </TouchableOpacity>

                {/* Category Examples */}
                {isExpanded && (
                  <View style={styles.examplesContainer}>
                    {category.examples.map((example, index) => (
                      <TouchableOpacity
                        key={example.key}
                        style={[
                          styles.exampleItem,
                          index === category.examples.length - 1 && styles.exampleItemLast
                        ]}
                        onPress={() => setActiveKey(example.key)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.exampleItemContent}>
                          <Text style={styles.exampleItemTitle}>
                            {example.title}
                          </Text>
                          <Text style={styles.exampleItemArrow}>→</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            );
          })}

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Tap any example to view it in action
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  // Header Styles (when viewing example)
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  backIcon: {
    fontSize: 20,
    color: '#2196F3',
    marginRight: 4,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 60,
  },

  // Content Styles
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Title Section
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '400',
  },

  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  // Category Styles
  categoryContainer: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  categoryHeaderLeft: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 13,
    color: '#757575',
    fontWeight: '400',
  },
  expandIcon: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 12,
  },

  // Examples Container
  examplesContainer: {
    backgroundColor: '#FFFFFF',
  },

  // Example Item Styles
  exampleItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  exampleItemLast: {
    borderBottomWidth: 0,
  },
  exampleItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  exampleItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#424242',
    flex: 1,
  },
  exampleItemArrow: {
    fontSize: 18,
    color: '#2196F3',
    fontWeight: '600',
  },

  // Footer
  footer: {
    marginTop: 24,
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#9E9E9E',
    textAlign: 'center',
  },
});