import 'react-native-reanimated';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo'
import { listingStyles } from './src/Example/Styles/ListingStyles'

import { EXAMPLE_CATEGORIES } from './src/Example/ExampleCategories'

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
        <SafeAreaView style={listingStyles.container}>
          <StatusBar barStyle="dark-content" />

          {/* Header with back button and title */}
          <View style={listingStyles.header}>
            <TouchableOpacity
              onPress={() => setActiveKey(null)}
              style={listingStyles.backButton}
            >
              <Entypo name="chevron-left" size={20} />
              <Text style={listingStyles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={listingStyles.headerTitle}>{selected?.title}</Text>
            <View style={listingStyles.headerSpacer} />
          </View>

          {/* Selected component */}
          <View style={listingStyles.content}>
            {SelectedComponent && <SelectedComponent />}
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={listingStyles.listContainer}>
        <StatusBar barStyle="dark-content" />

        {/* Title Section */}
        <View style={listingStyles.titleSection}>
          <Text style={listingStyles.mainTitle}>RNFlow Examples</Text>
          <Text style={listingStyles.subtitle}>
            Explore {EXAMPLE_CATEGORIES.reduce((sum, cat) => sum + cat.examples.length, 0)} examples
          </Text>
        </View>

        {/* Examples List */}
        <ScrollView
          style={listingStyles.scrollView}
          contentContainerStyle={listingStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {EXAMPLE_CATEGORIES.map((category, categoryIndex) => {
            const isExpanded = expandedCategories.has(category.category);

            return (
              <View key={category.category} style={listingStyles.categoryContainer}>
                {/* Category Header */}
                <TouchableOpacity
                  style={listingStyles.categoryHeader}
                  onPress={() => toggleCategory(category.category)}
                  activeOpacity={0.7}
                >
                  <View style={listingStyles.categoryHeaderLeft}>
                    <Text style={listingStyles.categoryTitle}>{category.category}</Text>
                    <Text style={listingStyles.categoryDescription}>
                      {category.description}
                    </Text>
                  </View>
                  <Text style={listingStyles.expandIcon}>
                    {isExpanded ? '▼' : '▶'}
                  </Text>
                </TouchableOpacity>

                {/* Category Examples */}
                {isExpanded && (
                  <View style={listingStyles.examplesContainer}>
                    {category.examples.map((example, index) => (
                      <TouchableOpacity
                        key={example.key}
                        style={[
                          listingStyles.exampleItem,
                          index === category.examples.length - 1 && listingStyles.exampleItemLast
                        ]}
                        onPress={() => setActiveKey(example.key)}
                        activeOpacity={0.7}
                      >
                        <View style={listingStyles.exampleItemContent}>
                          <Text style={listingStyles.exampleItemTitle}>
                            {example.title}
                          </Text>
                          <Text style={listingStyles.exampleItemArrow}>→</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            );
          })}

          {/* Footer */}
          <View style={listingStyles.footer}>
            <Text style={listingStyles.footerText}>
              Tap any example to view it in action
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}