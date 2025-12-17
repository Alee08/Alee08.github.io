# Alee08.github.io

My personal webpage.

Link: https://alee08.github.io


## Preliminaries

Follow this guide to set up your [Ruby development environment](https://cloud.google.com/ruby/docs/setup#linux-instructions).

Install Ruby (tested with `3.1.0`):
```
rbenv install 3.1.0
```

Install `bundler` (matches `Gemfile.lock`):

```
gem install bundler -v 2.3.12
```

Then:

```
bundle install
```

## Build

To build the Jekyll website:

```
bundle exec jekyll build
```

To serve:

```
bundle exec jekyll serve
```

To publish on GitHub (pushes `gh-pages` via SSH), from the `main` branch:
```
bundle exec rake publish
```
