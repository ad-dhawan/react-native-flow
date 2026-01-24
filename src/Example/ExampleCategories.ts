import Examples from './index';

export const EXAMPLE_CATEGORIES = [
    {
        category: 'Basic Examples',
        description: 'Simple examples to get started',
        examples: [
            { key: 'simple', title: 'Simple Tree', component: Examples.SimpleExample },
            { key: 'horizontal', title: 'Horizontal Flow', component: Examples.HorizontalFlowExample },
            { key: 'decision', title: 'Decision Tree', component: Examples.DecisionTreeExample },
        ],
    },
    {
        category: 'Business & Professional',
        description: 'Examples for business use cases',
        examples: [
            { key: 'org', title: 'Organization Chart', component: Examples.OrganizationChartExample },
            { key: 'roadmap', title: 'Project Roadmap', component: Examples.ProjectRoadmapExample },
            { key: 'network', title: 'Network Diagram', component: Examples.NetworkDiagramExample },
        ],
    },
    {
        category: 'Personal & Creative',
        description: 'Examples for personal projects',
        examples: [
            { key: 'family', title: 'Family Tree', component: Examples.FamilyTreeExample },
            { key: 'filesystem', title: 'File System', component: Examples.FileSystemExample },
            { key: 'shopping', title: 'Shopping Categories', component: Examples.ShoppingCategoryExample },
        ],
    },
    {
        category: 'Educational',
        description: 'Examples for learning and teaching',
        examples: [
            { key: 'knowledge', title: 'Knowledge Graph', component: Examples.KnowledgeGraphExample },
        ],
    },
    {
        category: 'Styling & Themes',
        description: 'Different visual styles',
        examples: [
            { key: 'dark', title: 'Dark Theme', component: Examples.DarkThemeExample },
            { key: 'minimalist', title: 'Minimalist Design', component: Examples.MinimalistExample },
        ],
    },
    {
        category: 'Advanced Features',
        description: 'Advanced customization examples',
        examples: [
            { key: 'multiselect', title: 'Multi-Select', component: Examples.MultiSelectExample },
            { key: 'customedge', title: 'Custom Edges', component: Examples.CustomEdgeExample },
        ],
    },
];