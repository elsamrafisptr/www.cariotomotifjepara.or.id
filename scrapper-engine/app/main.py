# app/main.py
import sys
import argparse

def cli():
    parser = argparse.ArgumentParser(
        description="My Scraper CLI"
    )
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser(
        "astra-honda",
        help="Run https://astra-honda.com scraper"
    )

    args = parser.parse_args()

    if args.command == "mercator":
        from contents.astra_honda_com.scraper import main as scraper_main
        scraper_main()
    else:
        parser.print_help()
        sys.exit(1)

if __name__ == "__main__":
    cli()
