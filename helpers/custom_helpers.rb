module CustomHelpers
  def post_image(opts)
    post_image_tag(opts)
  end

  def post_responsive_image(opts)
    post_image_tag(opts.merge({ :responsive => true }))
  end

  def picturefill_tag(opts)
    content_tag :div, :data => { :picture => "", :alt => opts[:caption]} do
      opts[:sizes].each do |size|
        # Strangely, this is the only way I got this empty div tag to
        # be properly printed and parsed
        content_tag :div, :data => { :media => size[:media], :src => path_to_post_image(size[:src]) } do
          " "
        end
      end

      opts[:sizes].select { |s| s[:canonical] }.each do |size|
        content_tag :noscript do
          image_tag path_to_post_image(size[:src]), :alt => opts[:caption]
        end
      end
    end
  end

  private

  def path_to_post_image(src)
    if /\/\//.match(src)
      return src
    end

    "/blog/#{current_article.slug}/#{src}"
  end

  def post_image_tag(opts)
    content_tag :figure, :class => "post-media" do
      link_to opts[:full], :title => "View full sized image" do
        if opts[:responsive]
          picturefill_tag(opts)
        else
          image_tag path_to_post_image(opts[:src]), :alt => opts[:caption]
        end
      end

      if (opts[:caption])
        content_tag :figcaption, :class => "caption" do
          opts[:caption]
        end
      end
    end
  end
end
