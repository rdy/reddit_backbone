class Reddit
  class << self
    def front_page
      json = JSON.parse(Typhoeus::Request.get('http://www.reddit.com/.json').body)
      json['data']['children'].map { |t| Hashie::Mash.new(t['data']) }
    end
  end
end
