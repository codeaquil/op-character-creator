# OP Character Creator

[![MextJS Deployment Pipeline](https://github.com/codeaquil/op-character-creator/actions/workflows/deploy.yml/badge.svg)](https://github.com/codeaquil/op-character-creator/actions/workflows/deploy.yml)
![Pirate King Monkey D Luffy](https://img.shields.io/badge/Pirate%20King-Monkey%20D%20Luffy-E62C39)

Generate your own character inspired by the world of One Piece!

## Running the Website

This website is intended for [GitHub Pages](https://docs.github.com/en/pages).
Enable GitHub Pages from settings and this website should be available at
`https://<your-username>.github.io/op-character-creator`.

## Adding New Character Options

1. Create a GitHub branch.
2. Edit `data/data.json5` with any new character traits. The traits and format
is commented in data/data.json5.
3. Create a pull request.
4. Merge the pull request and wait a few minutes for the new deployment.

## Development

### Dependencies

- NodeJS v22
- Ruby 3 (optional)

### Quick Start

1. `npm i`
2. `npm run start`
3. To close the server: `Ctrl-C`

### Ruby Server

A secondary Ruby server is provided to better test this static pages app. To use
it do:

1. `bundle install`
2. `ruby ./server.rb`
3. To close the server: `Ctrl-C`

### How it works

The command `npm run compile-data` will use `json5` to transform the data for
the website in the out/ folder. This is baked into the `npm run build` command,
which also uses NextJS to build the entire website into out/. A static-file
server must then serve the entire out/ folder and the website will operate
normally. The website uses ReactJS 19 and TailwindCSS 4, and should work on all
modern browsers.

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>

### Disclaimer

One Piece is owned by Shueisha and Eiichiro Oda. This software is not
affiliated with them in anyway, and is only taking inspiration from
One Piece under fair use.
