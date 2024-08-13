# Vue-based Front End Development Style Guide

This document provides coding style guidelines for developing Vue.js applications. It draws inspiration from Google's style guides to ensure consistency, readability, and maintainability.

## Table of Contents
1. [General Guidelines](#general-guidelines)
2. [Template Style Guide](#template-style-guide)
3. [Style (CSS/SCSS) Guide](#style-guide)
4. [Script (JavaScript) Style Guide](#script-style-guide)
5. [References](#references)

## General Guidelines

- **Consistency:** Follow a consistent coding style throughout the project.
- **Readability:** Write code that is easy to read and understand.
- **Maintainability:** Ensure the code is maintainable and scalable.
- **Component Organization:** Follow a logical and consistent file structure. Keep each component self-contained.

## Template Style Guide

### Structure and Formatting

- **Indentation:** Use 4 spaces for indentation.
- **Tags:** Always close tags properly.
- **Quotes:** Use double quotes for attribute values.
- **Self-closing tags:** Use self-closing syntax for tags without children.

```vue
<!-- Good -->
<template>
  <div class="container">
    <p class="title">Hello, Vue!</p>
  </div>
</template>

<!-- Bad -->
<template>
<div class="container">
<p class='title'>Hello, Vue!</p>
</div>
</template>
```

### Naming Conventions

- **Class Names:** Use lowercase with hyphens for separating words in class names.
- **Component Names:** Use PascalCase for component names.

```vue
<!-- Good -->
<template>
  <MainContainer></MainContainer>
</template>

<!-- Bad -->
<template>
  <maincontainer></maincontainer>
</template>
```

### Comments

- **Single-line comments:** Use `<!-- -->` for single-line comments within the template.

```vue
<!-- Main container view -->
<template>
  <div class="main-container"></div>
</template>
```

## Style (CSS/SCSS) Guide

### Structure and Formatting

- **Indentation:** Use 2 spaces for indentation.
- **Selectors:** Prefer class selectors over ID selectors.
- **Braces:** Place the opening brace on the same line as the selector and the closing brace on a new line.

```scss
/* Good */
.main-container {
  display: flex;
  justify-content: center;
}

/* Bad */
.main-container
{
  display: flex;
  justify-content: center;
}
```

### Naming Conventions

- **Class Names:** Use lowercase with hyphens for separating words.

```scss
/* Good */
.main-container {
  display: flex;
}

/* Bad */
.mainContainer {
  display: flex;
}
```

### Comments

- **Single-line comments:** Use `/* */` for single-line comments.
- **Block comments:** Use `/** */` for block comments.

```scss
/* Main container styles */
.main-container {
  display: flex;
  justify-content: center;
}

/**
 * Title styles
 * Used in main container
 */
.title {
  font-size: 20px;
  color: #333;
}
```

### Scoped Styles

- **Use Scoped Styles:** Use scoped styles within components to avoid global CSS conflicts.

```vue
<style scoped>
.main-container {
  display: flex;
  justify-content: center;
}
</style>
```

## Script (JavaScript) Style Guide

### Structure and Formatting

- **Indentation:** Use 2 spaces for indentation.
- **Semicolons:** Use semicolons to terminate statements.
- **Quotes:** Use single quotes for strings.

```js
// Good
const greeting = 'Hello, Vue!';

// Bad
const greeting = "Hello, Vue!"
```

### Naming Conventions

- **Variables:** Use camelCase for variable names.
- **Functions:** Use camelCase for function names. Use descriptive names that explain what the function does.
- **Components:** Use PascalCase for component names.

```js
// Good
let userName = 'John';
function fetchUserData() {
  // ...
}

// Bad
let user_name = 'John';
function fetchuserdata() {
  // ...
}
```

### Comments

- **Single-line comments:** Use `//` for single-line comments.
- **Block comments:** Use `/** */` for block comments.

```js
// Fetch user data from API
function fetchUserData() {
  // Implementation here
}

/**
 * Calculate the user's age
 * @param {Date} birthDate - The user's birth date
 * @return {number} The user's age
 */
function calculateAge(birthDate) {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
}
```

### Functions and Variables

- **Function Declarations:** Prefer function declarations for named functions.

```js
// Good
function fetchUserData() {
  // Implementation here
}

// Bad
const fetchUserData = function() {
  // Implementation here
};
```

- **Variable Declarations:** Use `const` for constants and `let` for variables that will be reassigned.

```js
// Good
const apiUrl = 'https://api.example.com/users';
let userData = null;

// Bad
var apiUrl = 'https://api.example.com/users';
userData = null;
```

### Vue-Specific Guidelines

- **Props:** Use camelCase for prop names in JavaScript and kebab-case when used in templates.

```vue
<!-- Good -->
<template>
  <child-component :user-name="userName"></child-component>
</template>

<script>
export default {
  props: {
    userName: String
  }
}
</script>

<!-- Bad -->
<template>
  <child-component :user_name="userName"></child-component>
</template>

<script>
export default {
  props: {
    user_name: String
  }
}
</script>
```

- **Lifecycle Hooks:** Order lifecycle hooks as per the Vue.js documentation for better readability.

```js
export default {
  data() {
    return {
      // data properties
    };
  },
  created() {
    // logic
  },
  mounted() {
    // logic
  },
  methods: {
    // methods
  }
};
```

## References

- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
- [Vue.js Style Guide](https://vuejs.org/style-guide/)
