"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXAMPLE_CATEGORIES = void 0;
const index_1 = __importDefault(require("./index"));
exports.EXAMPLE_CATEGORIES = [
    {
        category: 'Basic Examples',
        description: 'Simple examples to get started',
        examples: [
            { key: 'simple', title: 'Simple Tree', component: index_1.default.SimpleExample },
            { key: 'horizontal', title: 'Horizontal Flow', component: index_1.default.HorizontalFlowExample },
            { key: 'decision', title: 'Decision Tree', component: index_1.default.DecisionTreeExample },
        ],
    },
    {
        category: 'Business & Professional',
        description: 'Examples for business use cases',
        examples: [
            { key: 'org', title: 'Organization Chart', component: index_1.default.OrganizationChartExample },
            { key: 'roadmap', title: 'Project Roadmap', component: index_1.default.ProjectRoadmapExample },
            { key: 'network', title: 'Network Diagram', component: index_1.default.NetworkDiagramExample },
        ],
    },
    {
        category: 'Personal & Creative',
        description: 'Examples for personal projects',
        examples: [
            { key: 'family', title: 'Family Tree', component: index_1.default.FamilyTreeExample },
            { key: 'filesystem', title: 'File System', component: index_1.default.FileSystemExample },
            { key: 'shopping', title: 'Shopping Categories', component: index_1.default.ShoppingCategoryExample },
        ],
    },
    {
        category: 'Educational',
        description: 'Examples for learning and teaching',
        examples: [
            { key: 'knowledge', title: 'Knowledge Graph', component: index_1.default.KnowledgeGraphExample },
        ],
    },
    {
        category: 'Styling & Themes',
        description: 'Different visual styles',
        examples: [
            { key: 'dark', title: 'Dark Theme', component: index_1.default.DarkThemeExample },
            { key: 'minimalist', title: 'Minimalist Design', component: index_1.default.MinimalistExample },
        ],
    },
    {
        category: 'Advanced Features',
        description: 'Advanced customization examples',
        examples: [
            { key: 'multiselect', title: 'Multi-Select', component: index_1.default.MultiSelectExample },
            { key: 'customedge', title: 'Custom Edges', component: index_1.default.CustomEdgeExample },
        ],
    },
];
