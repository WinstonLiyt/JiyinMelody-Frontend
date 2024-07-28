# WeChat Mini-Program Development Style Guide

This document provides coding style guidelines for developing WeChat Mini-Programs using WXML, WXSS, and JavaScript. It draws inspiration from Google's style guides to ensure consistency, readability, and maintainability.

## Table of Contents
1. [General Guidelines](#general-guidelines)
2. [WXML Style Guide](#wxml-style-guide)
3. [WXSS Style Guide](#wxss-style-guide)
4. [JavaScript Style Guide](#javascript-style-guide)
5. [References](#references)

## General Guidelines

- **Consistency:** Follow a consistent coding style throughout the project.
- **Readability:** Write code that is easy to read and understand.
- **Maintainability:** Ensure the code is maintainable and scalable.

## WXML Style Guide

### Structure and Formatting

- **Indentation:** Use 2 spaces for indentation.
- **Tags:** Always close tags.
- **Quotes:** Use double quotes for attribute values.
- **Self-closing tags:** Use self-closing syntax for tags without children.

```wxml
<!-- Good -->
<view class="container">
  <text class="title">Hello, WeChat!</text>
</view>

<!-- Bad -->
<view class="container">
<text class='title'>Hello, WeChat!</text>
</view>
```

### Naming Conventions

- **Class Names:** Use lowercase with hyphens for separating words.

```wxml
<!-- Good -->
<view class="main-container"></view>

<!-- Bad -->
<view class="mainContainer"></view>
```

### Comments

- **Single-line comments:** Use `<!-- -->` for single-line comments.

```wxml
<!-- Main container view -->
<view class="main-container"></view>
```

## WXSS Style Guide

### Structure and Formatting

- **Indentation:** Use 2 spaces for indentation.
- **Selectors:** Use class selectors over ID selectors.
- **Braces:** Place opening brace on the same line as the selector, and closing brace on a new line.

```css
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

```css
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

```css
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

## JavaScript Style Guide

### Structure and Formatting

- **Indentation:** Use 2 spaces for indentation.
- **Semicolons:** Use semicolons to terminate statements.
- **Quotes:** Use single quotes for strings.

```js
// Good
const greeting = 'Hello, WeChat!';

// Bad
const greeting = "Hello, WeChat!"
```

### Naming Conventions

- **Variables:** Use camelCase for variable names.

```js
// Good
let userName = 'John';

// Bad
let user_name = 'John';
```

- **Functions:** Use camelCase for function names. Use descriptive names that explain what the function does.

```js
// Good
function fetchUserData() {
  // ...
}

// Bad
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

- **Function Declarations:** Use function declarations for named functions.

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

## References

- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
