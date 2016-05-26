#!/usr/bin/env python
# -*- coding: utf-8 -*-
## this script requires YAML frontmatter parsing from python-frontmatter
## install it!

import glob
import frontmatter
import os
import json

options = {
    "blog_pages_directory": "blogPages",
    "page_extension": "md",
    "api_base": "fauxapi",
    "content_directory_name": "content",
}
# and computed options entries
options["output_base"] = os.path.join("public", options["api_base"])

class BlogLibrarian(object):
    def __init__(self, post_paths):
        self.make_dirs()

        self.posts = []
        self.load_posts(post_paths)

    def make_dirs(self):
        """Ensures that any directories needed are created
        
        This is essientially mkdir -p type of functionality before
        the other methods try to create files in those directories
        """
        deepest_json_folder = os.path.join(options["output_base"], "blogPosts")
        deepest_content_folder = os.path.join(options["output_base"], options["content_directory_name"])

        # mkdir -p deepest
        os.makedirs(deepest_json_folder, exist_ok=True)
        os.makedirs(deepest_content_folder, exist_ok=True)

    def clean(self):
        """Deletes any previously generated files"""
        # need to implement this... for now, alert the caller with an error
        raise NotImplementedError()
        
    def load_posts(self, post_paths):
        for post_path in post_paths:
            # load tuples of (path, front matter)
            self.posts.append((post_path, frontmatter.load(post_path)))

        # sort by date, use this 
        def get_date_field(post):
            return post[1].metadata['pubDate']

        self.posts.sort(key=get_date_field)

    def output_all(self):
        """Outputs the whole blog faux api and content"""
        
        # Load this index up with blog objects in the format expected
        # as a REST endpoint. Then it can be serialized directly to json
        posts_index = {
            "blogPosts": []
        }

        # use the indices to assign model id's
        for index, (post_path, post_frontmatter) in enumerate(self.posts):
            model = post_frontmatter.metadata

            # add in the id
            model["id"] = index

            # change the datetime object to an isoformat string
            model["pubDate"] = model["pubDate"].isoformat()

            # add in the determined resource url for the content
            content_file_name = os.path.basename(post_path)
            # not using os.path.join since browser will use "/"
            model['contentFile'] = "/".join([
                options["api_base"],
                options["content_directory_name"],
                content_file_name
            ])

            posts_index['blogPosts'].append(model)

            # now write this model to it's appropriate file
            model_json_path = os.path.join(options["output_base"], "blogPosts", "{}.json".format(index))
            with open(model_json_path, "w+") as model_json_file:
                json.dump({"blogPost": model}, model_json_file)

            # now write the de-frontmattered content to contentFile
            content_path = os.path.join(
                options["output_base"],
                options["content_directory_name"],
                content_file_name
            )
            with open(content_path, "w+") as content_file:
                content_file.write(post_frontmatter.content)

        # finally, write posts_index as json to it's proper path
        index_json_path = os.path.join(options["output_base"], "blogPosts.json")
        with open(index_json_path, "w+") as index_json_file:
            json.dump(posts_index, index_json_file)

def main():
    matches = glob.glob("{}/*.{}".format(
        options["blog_pages_directory"],
        options["page_extension"]),
    )

    postLib = BlogLibrarian(matches)
    postLib.output_all()


if __name__ == "__main__":
    main()
