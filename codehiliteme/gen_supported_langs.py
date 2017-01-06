"""
This file is used to grab all the extensions supported by both
pygments and github linguist. Together, these extensions are used
to detect files that can be highlighted using highlight.js
"""
# -*- coding: utf-8 -*-

import re
import json
import subprocess
import yaml
import requests
from pygments.lexers import get_all_lexers

GITHUB_LINGUIST_LANGUAGES_URL = \
    'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml'

HLJS_LANGS = set(
    subprocess.check_output([
        "node", "-e",
        """const hljs = require('./highlight.js/build/highlight.min.js');
        console.log(hljs.listLanguages().join(" "));"""
    ]).decode().split())


def main():
    ext_patt = re.compile(r'((?:\w*?\.?)[-+\w]+)$')

    req = requests.get(GITHUB_LINGUIST_LANGUAGES_URL)
    gh_data, pyg_data = {}, list(get_all_lexers())
    if req.status_code == 200:
        gh_data = yaml.load(req.text)

    extension_mapper = {
        lexer[0].lower(): set(
            ext_patt.search(ext).group(1) for ext in lexer[2]
            if ext_patt.search(ext))
        for lexer in pyg_data if lexer[0].lower() in HLJS_LANGS
    }

    gh_data['C#']['aliases'].append('cs')

    for lang in gh_data:
        accepted = ''
        if lang.lower() in HLJS_LANGS:
            accepted = lang.lower()
        elif 'aliases' in gh_data[lang]:
            for alias in map(str.lower, gh_data[lang]['aliases']):
                if alias in HLJS_LANGS:
                    accepted = alias
                    break
        if accepted:
            if accepted not in extension_mapper:
                extension_mapper[accepted] = set()
            extension_mapper[accepted] |= set(gh_data[lang]['extensions'])

    extension_mapper.update({
        # item[0]: {
        #     'ext': list(item[1])
        # }
        item[0]: {
            'ext': list(ext for ext in item[1]
                        if ext_patt.match(ext) and ext.startswith('.')),
            'special': list(ext for ext in item[1]
                            if ext_patt.match(ext) and not ext.startswith('.'))
        }
        for item in extension_mapper.items()
    })

    with open('langs.yml', 'w') as mapping:
        yaml.dump(
            extension_mapper,
            stream=mapping,
            encoding='utf-8',
            default_flow_style=False)

    with open('supported_langs.json', 'w') as json_file:
        inverse_mapping = {
            ftype.lower(): lang
            for lang in extension_mapper for ftype in extension_mapper[lang][
                'ext'] + extension_mapper[lang]['special']
        }

        json.dump(
            inverse_mapping,
            fp=json_file,
            sort_keys=True,
            separators=(',',':'))


if __name__ == '__main__':
    main()
