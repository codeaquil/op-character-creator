# OP Character Creator

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
