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
  sync.bucket = 'eshiota.com'
  sync.region = 'sa-east-1'
  sync.aws_access_key_id = ENV['AWS_ACCESS_KEY_ID']
  sync.aws_secret_access_key = ENV['AWS_SECRET_ACCESS_KEY']
  sync.delete = true
  sync.after_build = true
  sync.prefer_gzip = true
end

# Redirection rules on Amazon S3
# https://github.com/fredjean/middleman-s3_redirect
activate :s3_redirect do |config|
  config.bucket                = 'eshiota.com'
  config.region                = 'sa-east-1'
  config.aws_access_key_id     = ENV['AWS_ACCESS_KEY_ID']
  config.aws_secret_access_key = ENV['AWS_SECRET_ACCESS_KEY']
  config.after_build           = true
end

# Middleman blog extension
# https://github.com/middleman/middleman-blog
activate :blog do |blog|
  blog.prefix = "blog"
  blog.tag_template = "tag.html"
  blog.layout = "blog_layout"
  blog.default_extension = ".markdown.erb"
end

# Activates directory_indexes
# e.g. /foo/bar/index.html instead of /foo/bar.html
activate :directory_indexes

# Build feed.xml without trying to render a layout
page "/feed.xml", :layout => false

# S3 redirection rules
redirected_posts = [
  { :date => "2012-05-13", :slug => "o-primeiro-dia-das-maes-fora-de-casa-em-casa" },
  { :date => "2011-08-31", :slug => "dev-in-sampa-2011-ux-for-developers" },
  { :date => "2011-06-20", :slug => "pechakucha-sao-paulo-vol-8-inspire-japan" },
  { :date => "2011-04-07", :slug => "user-experience-desenvolvendo-para-usuarios-e-nao-para-maquinas" },
  { :date => "2011-04-05", :slug => "foursquare-redes-sociais-privacidade-e-afins" },
  { :date => "2011-03-22", :slug => "a-agenda-de-benjamin-franklin-e-a-sociedade-moderna" },
  { :date => "2010-10-05", :slug => "an-event-apart-2010-e-a-morte-da-web" },
  { :date => "2010-09-02", :slug => "dedicatoria-a-minha-grande-mentora" },
  { :date => "2010-08-18", :slug => "dev-in-sampa-2010" }
]

redirected_posts.each do |post|
  date = post[:date].split("-")
  redirect "/#{date[0]}/#{date[1]}/#{post[:slug]}", "/blog/#{date[0]}/#{date[1]}/#{date[2]}/#{post[:slug]}"
end

redirect "/blog", "http://www.eshiota.com"
