# readability-js

Extract article content from web pages using Mozilla's Readability (Firefox Reader Mode algorithm).

## Usage

```bash
node index.js <URL>
```

### Example

```bash
node index.js https://example.com/article
```

## Output

```
Title: Article Title
Author: Author Name
Length: 12345 characters
Excerpt: Brief summary...

=== Content ===
Full article text...
```