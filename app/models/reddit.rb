class Reddit
  class << self
    def front_page
      json = JSON.parse(Typhoeus::Request.get('http://www.reddit.com/.json').body)
      json['data']['children'].map { |t| Hashie::Mash.new(t['data']) }
    end

    def comment(permalink)
      JSON.parse(Typhoeus::Request.get("http://www.reddit.com/#{permalink}.json").body, max_nesting: false)
    end
  end
end
