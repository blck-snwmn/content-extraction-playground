import sys
import requests
from readability import Document


def extract_content(url):
    """URLからコンテンツを抽出する"""
    try:
        # URLからHTMLを取得
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        # Readabilityで解析（テキストとして渡す）
        doc = Document(response.text, url=url)
        
        # 結果を返す
        return {
            'success': True,
            'title': doc.title(),
            'short_title': doc.short_title(),
            'content': doc.summary(),
            'url': url
        }
    except requests.RequestException as e:
        return {
            'success': False,
            'error': f"Network error: {e}",
            'url': url
        }
    except Exception as e:
        return {
            'success': False,
            'error': f"Processing error: {e}",
            'url': url
        }


def main():
    if len(sys.argv) < 2:
        print("Usage: uv run main.py <URL>")
        sys.exit(1)
    
    url = sys.argv[1]
    print(f"Extracting content from: {url}\n")
    
    result = extract_content(url)
    
    if result['success']:
        print(f"Title: {result['title']}")
        print(f"Short Title: {result['short_title']}")
        print("\nContent (HTML):")
        print("-" * 50)
        print(result['content'])
        print("-" * 50)
    else:
        print(f"Error: {result['error']}")


if __name__ == "__main__":
    main()