"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knowledgeGraphData = void 0;
exports.knowledgeGraphData = {
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
