# Contributing to RNFlow

Thank you for your interest in contributing to RNFlow! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## Code of Conduct

### Our Pledge

We are committed to providing a friendly, safe, and welcoming environment for all contributors, regardless of experience level, gender identity, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

### Our Standards

**Examples of behavior that contributes to a positive environment:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**

- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Project maintainers have the right to remove, edit, or reject comments, commits, code, issues, and other contributions that do not align with this Code of Conduct.

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git
- React Native development environment (Xcode for iOS, Android Studio for Android)
- TypeScript knowledge

### First Time Contributors

New to open source? Here's how to get started:

1. Look for issues labeled `good first issue` or `help wanted`
2. Read the issue description carefully
3. Ask questions if anything is unclear
4. Fork the repository and create a branch
5. Make your changes and submit a PR

---

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/react-native-rnflow.git
cd react-native-rnflow
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Development Environment

```bash
# Create a new React Native project for testing
npx react-native init RNFlowDev
cd RNFlowDev

# Link your local RNFlow
npm link ../react-native-rnflow

# Install peer dependencies
npm install react-native-svg react-native-gesture-handler react-native-reanimated react-native-vector-icons

# iOS
cd ios && pod install && cd ..

# Run the app
npx react-native run-ios
# or
npx react-native run-android
```

### 4. Build the Package

```bash
cd react-native-rnflow
npm run build
```

### 5. Run Tests

```bash
npm test
```

### 6. Lint Code

```bash
npm run lint
```

---

## How to Contribute

### Ways to Contribute

1. **Report Bugs** - Found a bug? [Open an issue](#reporting-bugs)
2. **Suggest Features** - Have an idea? [Suggest it](#suggesting-features)
3. **Fix Issues** - Pick an issue and submit a PR
4. **Improve Documentation** - Help others understand RNFlow better
5. **Add Examples** - Create new examples for common use cases
6. **Review PRs** - Help review other contributors' work

### Contribution Workflow

1. **Find or Create an Issue**
   - Check if issue already exists
   - If not, create a new one describing the bug/feature
   - Wait for maintainer feedback before starting work

2. **Fork and Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

3. **Make Changes**
   - Write clean, readable code
   - Follow coding standards
   - Add tests for new features
   - Update documentation

4. **Test Thoroughly**
   ```bash
   npm test
   npm run lint
   ```

5. **Commit**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

6. **Push and PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   - Open a Pull Request on GitHub
   - Fill out the PR template
   - Link to related issue

---

## Coding Standards

### TypeScript

- **Always use TypeScript** - No plain JavaScript
- **Strict mode** - Follow strict TypeScript rules
- **Type everything** - Avoid `any` types
- **Generics** - Use generics for reusable components

**Example:**
```typescript
// Good
interface MyProps<T> {
  data: T[];
  onSelect: (item: T) => void;
}

// Bad
interface MyProps {
  data: any;
  onSelect: Function;
}
```

### Code Style

We use ESLint and Prettier. Run before committing:

```bash
npm run lint
npm run format
```

**General Rules:**

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Max line length: 100 characters
- Use descriptive variable names

**Example:**
```typescript
// Good
const handleNodeSelection = (node: RNFlowNode) => {
  setSelectedNodes([node.id]);
};

// Bad
const f = (n: any) => {
  setSelectedNodes([n.id]);
};
```

### File Organization

```
src/
├── components/
│   ├── RNFlow.tsx           # Main component
│   ├── ZoomControls.tsx     # Zoom controls component
│   └── types.ts             # Type definitions
├── utils/
│   ├── layout.ts            # Layout calculations
│   └── helpers.ts           # Helper functions
├── hooks/
│   └── useTreeLayout.ts     # Custom hooks
└── index.ts                 # Exports
```

### Component Structure

```tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

// Types
interface MyComponentProps {
  // ...
}

// Component
export function MyComponent({ prop1, prop2 }: MyComponentProps) {
  // Hooks
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {
    // ...
  }, []);
  
  // Handlers
  const handleAction = () => {
    // ...
  };
  
  // Render
  return (
    <View style={styles.container}>
      {/* ... */}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    // ...
  },
});
```

### Naming Conventions

- **Components:** PascalCase (`MyComponent`)
- **Files:** PascalCase for components (`MyComponent.tsx`)
- **Variables:** camelCase (`myVariable`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_ZOOM_LEVEL`)
- **Types/Interfaces:** PascalCase (`MyInterface`)
- **Functions:** camelCase (`calculateLayout`)

---

## Testing Guidelines

### Writing Tests

We use Jest and React Native Testing Library.

**Test Structure:**
```typescript
import { render, fireEvent } from '@testing-library/react-native';
import RNFlow from '../RNFlow';

describe('RNFlow', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<RNFlow data={testData} />);
    expect(getByTestId('rnflow-container')).toBeTruthy();
  });

  it('handles node press', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <RNFlow 
        data={testData} 
        interaction={{ onNodePress: onPress }} 
      />
    );
    
    fireEvent.press(getByText('Root'));
    expect(onPress).toHaveBeenCalledWith(
      expect.objectContaining({ id: '1' })
    );
  });
});
```

### Test Coverage

- **Minimum coverage:** 80% for new code
- Test all public APIs
- Test edge cases
- Test error conditions

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test
npm test -- MyComponent.test.tsx

# Watch mode
npm test -- --watch
```

---

## Pull Request Process

### Before Submitting

- [ ] Tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Documentation is updated
- [ ] Examples are added (if applicable)
- [ ] CHANGELOG.md is updated

### PR Title Format

Use conventional commits:

- `feat: add new feature`
- `fix: correct bug in X`
- `docs: update README`
- `refactor: improve code structure`
- `test: add tests for X`
- `chore: update dependencies`

### PR Description Template

```markdown
## Description
Brief description of changes

## Related Issue
Closes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Examples added
- [ ] CHANGELOG updated
```

### Review Process

1. **Automated Checks** - CI/CD runs tests and linting
2. **Maintainer Review** - Core team reviews code
3. **Feedback** - Address any requested changes
4. **Approval** - At least one maintainer approval required
5. **Merge** - Maintainer will merge when ready

### After Merge

- Your contribution will be in the next release
- You'll be added to contributors list
- Thank you! 🎉

---

## Reporting Bugs

### Before Reporting

1. **Search existing issues** - Check if already reported
2. **Use latest version** - Update to latest RNFlow
3. **Minimal reproduction** - Create minimal example

### Bug Report Template

```markdown
**Bug Description**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen

**Actual Behavior**
What actually happened

**Screenshots**
Add screenshots if applicable

**Environment**
- RNFlow version: 
- React Native version: 
- Platform: iOS/Android
- Device: 
- OS version: 

**Code Sample**
```tsx
// Minimal code to reproduce
```

**Additional Context**
Any other relevant information
```

---

## Suggesting Features

### Before Suggesting

1. **Check existing requests** - May already be planned
2. **Consider scope** - Should fit RNFlow's purpose
3. **Think about API** - How would it work?

### Feature Request Template

```markdown
**Feature Description**
Clear description of the feature

**Problem it Solves**
What problem does this address?

**Proposed Solution**
How should it work?

**API Design**
```tsx
// Example of how the API might look
<RNFlow newFeature={{ ... }} />
```

**Alternatives Considered**
Other ways to solve this

**Additional Context**
Any other relevant information
```

---

## Development Tips

### Debugging

Add `debug` prop to see helpful information:
```tsx
<RNFlow data={data} debug={true} />
```

### Hot Reload

Changes to the component will hot reload in your test app.

### Testing with Example App

Use the included example app:
```bash
cd example
npm install
npx react-native run-ios
```

### Common Issues

**Issue:** Changes not reflecting

**Solution:**
```bash
cd react-native-rnflow
npm run build
cd ../RNFlowDev
npx react-native start --reset-cache
```

---

## Code Review Checklist

When reviewing PRs, check for:

- [ ] Code follows style guide
- [ ] Tests are comprehensive
- [ ] Documentation is clear
- [ ] No breaking changes (or properly documented)
- [ ] Performance is considered
- [ ] TypeScript types are correct
- [ ] Examples are updated
- [ ] Commit messages are clear

---

## Release Process

(For maintainers)

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag: `git tag v1.0.0`
4. Push tag: `git push --tags`
5. GitHub Actions will publish to npm
6. Create GitHub release

---

## Questions?

- 💬 [GitHub Discussions](https://github.com/yourusername/react-native-rnflow/discussions)
- 📧 [Email maintainers](mailto:maintainers@rnflow.dev)
- 📖 [Read documentation](./README.md)

---

## Recognition

Contributors will be:
- Listed in README
- Mentioned in release notes
- Added to CONTRIBUTORS.md

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

<div align="center">

**Thank you for contributing to RNFlow!** 🎉

We appreciate your time and effort in making RNFlow better for everyone.

</div>