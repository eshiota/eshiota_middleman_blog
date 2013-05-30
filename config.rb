Time.zone = "Brasilia"

set :css_dir, "stylesheets"

set :js_dir, "javascripts"

set :images_dir, "images"

# Build-specific configuration
configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :cache_buster
  activate :gzip
end

# Deployment configuration for middleman-s3_sync
# https://github.com/fredjean/middleman-s3_sync
activate :s3_sync do |sync|
  sync.bucket = 'www.eshiota.com'
  sync.region = 'sa-east-1'
  sync.aws_access_key_id = ENV['AWS_ACCESS_KEY_ID']
  sync.aws_secret_access_key = ENV['AWS_SECRET_ACCESS_KEY']
  sync.delete = true
  sync.after_build = false
  sync.prefer_gzip = true
end

activate :blog do |blog|
  blog.prefix = "blog"
  blog.tag_template = "tag.html"
  blog.layout = "blog_layout"
  blog.default_extension = ".markdown.erb"
end

activate :directory_indexes

page "/feed.xml", :layout => false
