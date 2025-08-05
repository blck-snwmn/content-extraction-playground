# Content Extraction Playground

Various web content extraction implementations using different libraries and languages.

## Projects

- **[readability-py/](./readability-py/)** - Python + readability-lxml
- **[trafilatura-py/](./trafilatura-py/)** - Python + trafilatura
- **[readability-js/](./readability-js/)** - JavaScript + Mozilla Readability
- **[mdconv-cfwk/](./mdconv-cfwk/)** - Cloudflare Workers + AI Markdown conversion

## Quick Start

```bash
# Python
cd readability-py && uv run main.py https://example.com
cd trafilatura-py && uv run main.py https://example.com

# JavaScript
cd readability-js && node index.js https://example.com
cd mdconv-cfwk && pnpm run dev
# Then visit: http://localhost:8787/?url=https://example.com
```