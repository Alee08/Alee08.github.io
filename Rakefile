require "rubygems"
require "tmpdir"

require "bundler/setup"
require "jekyll"


# Change your GitHub reponame
GITHUB_REPONAME = "Alee08/Alee08.github.io"


desc "Generate blog files"
task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site"
  })).process
end


desc "Generate and publish blog to gh-pages"
task :publish => [:generate] do
  origin_url = ENV["PUBLISH_REMOTE"] || `git config --get remote.origin.url`.strip
  origin_url = "git@github.com:#{GITHUB_REPONAME}.git" if origin_url.empty?

  Dir.mktmpdir do |tmp|
    cp_r "_site/.", tmp

    pwd = Dir.pwd
    Dir.chdir tmp

    system "git init"
    system "git checkout -b gh-pages"
    system "git add ."
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m #{message.inspect}"
    system "git", "remote", "add", "origin", origin_url
    system "git", "push", "origin", "gh-pages", "--force"

    Dir.chdir pwd
  end
end
