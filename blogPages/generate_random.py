#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
from multiprocessing import Pool
import datetime
import random

# requires requests, install it to use this script
import requests

def title_to_outpath(title):
    # replace spaces with underscores
    return ".".join([title.replace(" ", "_"), "fakepost", "md"])

def gen_random_isodate():
    random_delta = datetime.timedelta(
        days=random.randint(-100, 100),
        hours=random.randint(-60, 60),
        minutes=random.randint(-60, 60)
    )

    # ember expects ISO format datetimes
    return (datetime.datetime.now() + random_delta).isoformat()


def gen_save_random():
    """Generates (by calling the API) and saves a random post"""

    # call the API
    r = requests.get("https://jaspervdj.be/lorem-markdownum/markdown.txt")
    
    # make the front matter from the first and third lines
    split = r.text.splitlines()
    title = split[0].split("# ")[1]
    subtitle = split[2].split("## ")[1]

    with open(title_to_outpath(title), "w+") as outfile:
        # front matter
        outfile.write("\n".join([
            "---",
            "title: {}".format(title),
            "subtitle: {}".format(subtitle),
            "pubDate: {}".format(gen_random_isodate()),
            "---",
            "",
            # date should also be written here
        ]))

        # put the rest of the content after front matter
        outfile.write("\n".join(split[3:]))

def main():
    try:
        num_to_gen = int(sys.argv[1])
    except (IndexError, ValueError):
        print("usage: ./generate_random.py <num to generate>")
        sys.exit(1)

    # use a process pool to download async
    max_pool_size = 150
    pool = Pool(processes=min(num_to_gen, max_pool_size))
    for i in range(0, num_to_gen):
        pool.apply_async(gen_save_random)

    pool.close()
    pool.join()

if __name__ == "__main__":
    main()
