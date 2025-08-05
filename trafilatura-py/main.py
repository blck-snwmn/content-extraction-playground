def main():
    print("Hello from trafilatura-py!")

    from trafilatura import fetch_url, extract

    downloaded = fetch_url('https://hololive.hololivepro.com/news/20250628-01-346')

    result = extract(downloaded)
    print(result)


if __name__ == "__main__":
    main()
