# Contributing to RNFlow

Thank you for your interest in contributing to RNFlow! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of experience level, gender, gender identity, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

### Expected Behavior

- Be respectful and considerate
- Use welcoming and inclusive language
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other contributors

### Unacceptable Behavior

- Harassment, trolling, or discriminatory comments
- Personal attacks or insults
- Publishing others' private information
- Any conduct that could be considered inappropriate in a professional setting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native development environment
- Git
- Code editor (VS Code recommended)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-native-rnflow.git
   cd react-native-rnflow
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/react-native-rnflow.git
   ```

## Development Setup

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Build the Project

```bash
npm run build
```

### Run Tests

```bash
npm test
```

### Run Linter

```bash
npm run lint
```

### Run Formatter

```bash
npm run format
```

## How to Contribute

### Types of Contributions

1. **Bug Reports**: Found a bug? Let us know!
2. **Feature Requests**: Have an idea? Share it!
3. **Code Contributions**: Fix bugs or implement features
4. **Documentation**: Improve docs, add examples
5. **Testing**: Add or improve tests
6. **Design**: UI/UX improvements

### Before You Start

1. Check existing issues and PRs
2. Discuss major changes in an issue first
3. Make sure tests pass
4. Follow our coding standards

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Provide proper type annotations
- Avoid `any` types when possible
- Use interfaces for object types
- Export types that might be useful to consumers

**Example:**
```typescript
// Good
interface NodeData {
  title: string;
  subtitle?: string;
}

const node: RNFlowNode<NodeData> = {
  id: '1',
  data: { title: 'Example' },
};

// Bad
const node: any = {
  id: '1',
  data: { title: 'Example' },
};
```

### Code Style

We use ESLint and Prettier for code formatting. Run before committing:

```bash
npm run lint
npm run format
```

**Key conventions:**
- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas
- Use arrow functions
- Use destructuring when appropriate
- Keep functions small and focused

### Naming Conventions

- **Components**: PascalCase (`RNFlow`, `NodeRenderer`)
- **Functions**: camelCase (`layoutTree`, `handleNodePress`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_NODE_WIDTH`)
- **Types/Interfaces**: PascalCase (`RNFlowNode`, `LayoutConfig`)
- **Files**: PascalCase for components (`RNFlow.tsx`), camelCase for utilities (`layoutHelpers.ts`)

### Component Structure

```typescript
// 1. Imports
import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';

// 2. Types
interface Props {
  // ...
}

// 3. Constants
const DEFAULT_VALUE = 10;

// 4. Component
const MyComponent: React.FC<Props> = (props) => {
  // 4.1 Hooks
  const [state, setState] = useState();
  
  // 4.2 Callbacks
  const handlePress = useCallback(() => {
    // ...
  }, []);
  
  // 4.3 Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 4.4 Render
  return (
    <View>
      {/* ... */}
    </View>
  );
};

// 5. Styles
const styles = StyleSheet.create({
  // ...
});

// 6. Export
export default MyComponent;
```

### Documentation

- Add JSDoc comments for public APIs
- Include examples in comments
- Document complex logic
- Update README when adding features

**Example:**
```typescript
/**
 * Calculates the layout positions for all nodes in the tree.
 * 
 * @param node - The root node of the tree
 * @param depth - Current depth level (default: 0)
 * @param offset - Horizontal offset tracker
 * @param config - Layout configuration
 * @returns The node with calculated x,y positions
 * 
 * @example
 * ```typescript
 * const layout = layoutTree(rootNode, 0, { value: 0 }, config);
 * ```
 */
function layoutTree<T>(
  node: RNFlowNode<T>,
  depth: number,
  offset: { value: number },
  config: LayoutConfig
): RNFlowNode<T> {
  // Implementation
}
```

## Testing Guidelines

### Test Structure

```typescript
describe('Component/Function Name', () => {
  describe('Feature/Method', () => {
    it('should do something specific', () => {
      // Arrange
      const input = ...;
      
      // Act
      const result = ...;
      
      // Assert
      expect(result).toBe(...);
    });
  });
});
```

### Coverage Requirements

- Line coverage: > 80%
- Branch coverage: > 75%
- Function coverage: > 80%

### What to Test

1. **Unit Tests**: Individual functions and utilities
2. **Component Tests**: Component rendering and interactions
3. **Integration Tests**: Component interactions
4. **Snapshot Tests**: UI consistency

### Test Best Practices

- Write descriptive test names
- Test one thing per test
- Use meaningful assertions
- Mock external dependencies
- Keep tests fast
- Don't test implementation details

## Pull Request Process

### Before Submitting

1. **Update your fork:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes:**
   - Write code
   - Add tests
   - Update documentation

4. **Run checks:**
   ```bash
   npm run lint
   npm run format
   npm test
   npm run build
   ```

5. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```
   
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes
   - `refactor:` Code refactoring
   - `test:` Test changes
   - `chore:` Maintenance tasks

6. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

### Creating the Pull Request

1. Go to GitHub and create a PR
2. Fill out the PR template completely
3. Link related issues
4. Add screenshots/videos for UI changes
5. Request reviews from maintainers

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] Changelog updated (for significant changes)
```

### Review Process

1. At least one maintainer must approve
2. All CI checks must pass
3. No unresolved conversations
4. Up to date with main branch

### After Approval

Maintainers will merge your PR. Thank you for contributing! 🎉

## Issue Guidelines

### Bug Reports

Use the bug report template and include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**:
   - RNFlow version
   - React Native version
   - Platform (iOS/Android)
   - Device/Simulator
6. **Code Sample**: Minimal reproduction code
7. **Screenshots**: If applicable

### Feature Requests

Use the feature request template and include:

1. **Problem**: What problem does this solve?
2. **Solution**: Proposed solution
3. **Alternatives**: Other solutions considered
4. **Examples**: Similar features in other libraries
5. **Use Cases**: Real-world scenarios

### Questions

For questions:
1. Check documentation first
2. Search existing issues
3. Use discussions for general questions
4. Open an issue for specific problems

## Development Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring
- `test/description` - Tests only

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope?): subject

body?

footer?
```

**Examples:**
```
feat(zoom): add double-tap to reset zoom

fix(layout): correct horizontal edge rendering

docs(readme): update installation instructions

test(layout): add tests for tree bounds calculation
```

### Release Process

Maintainers handle releases:

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release tag
4. Publish to npm
5. Create GitHub release

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Discord**: Real-time chat (link in README)
- **Twitter**: Updates and announcements

### Getting Help

1. Read the documentation
2. Search existing issues
3. Ask in discussions
4. Join our Discord
5. Open an issue if still stuck

## Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- CHANGELOG.md
- GitHub contributors page

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to reach out:
- Open a discussion on GitHub
- Join our Discord server
- Email: contribute@rnflow.dev

Thank you for contributing to RNFlow! 🚀