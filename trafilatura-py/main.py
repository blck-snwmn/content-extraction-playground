def main():
    print("Hello from trafilatura-py!")

    from trafilatura import fetch_url, extract
    import sys

    if len(sys.argv) < 2:
        print("Usage: uv run main.py <URL>")
        sys.exit(1)
    
    url = sys.argv[1]
    print(f"Extracting content from: {url}\n")
    

    downloaded = fetch_url(url)

    result = extract(downloaded)
    print(result)


if __name__ == "__main__":
    main()
