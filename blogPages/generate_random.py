#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import threading

# requires requests, install it to use this script
import requests

def title_to_outpath(title):
    # replace spaces with underscores
    return ".".join([title.replace(" ", "_"), "fakepost", "md"])

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
            "subtitle: {}".format(title),
            "---",
            "",
            # date should also be written here
        ]))

        # put the rest of the content after front matter
        outfile.write("\n".join(split[3:]))

class PostGeneratorThread(threading.Thread):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def run(self):
        gen_save_random()

def main():
    try:
        num_to_gen = int(sys.argv[1])
    except (IndexError, ValueError):
        print("usage: ./generate_random.py <num to generate>")
        sys.exit(1)


    threads = [PostGeneratorThread() for i in range(0, num_to_gen)]
    for thread in threads:
        thread.start()

    for thread in threads:
        thread.join()

if __name__ == "__main__":
    main()
