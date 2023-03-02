module.exports = {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  overrides: [
    {
      files: '*.css',
      options: {
        // Exclude the prettier/prettier rule for CSS files
        // to avoid the error message you mentioned.
        // You can add more excluded rules as needed.
        rules: {
          'prettier/prettier': ['off'],
        },
      },
    },
  ],
}
