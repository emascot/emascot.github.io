source 'https://rubygems.org'

# Make sure gem versions are same as Github's
require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

group :jekyll_plugins do
  gem "github-pages", versions['github-pages']
  gem "jekyll-paginate"
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
end
