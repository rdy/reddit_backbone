module Jasmine
  class RailsRunAdapter < ::Jasmine::RunAdapter
    def self.app(config)
      Rack::Builder.app do
        use Rack::Head

        map('/assets') do
          run Rails.application.assets
        end

        map('/run.html') { run Jasmine::Redirect.new('/') }
        map('/__suite__') { run Jasmine::FocusedSuite.new(config) }

        map('/__JASMINE_ROOT__') { run Rack::File.new(Jasmine::Core.path) }
        map(config.spec_path) { run Rack::File.new(config.spec_dir) }
        map(config.root_path) { run Rack::File.new(config.project_root) }

        map('/') do
          run Rack::Cascade.new([
                                    Rack::URLMap.new('/' => Rack::File.new(config.src_dir)),
                                    Jasmine::RunAdapter.new(config)
                                ])
        end
      end
    end
  end

  class Config
    def start_server(port = 8888)
      require File.expand_path('../../../../config/environment', __FILE__)

      server = Rack::Server.new(:Port => port, :AccessLog => [], :server => 'thin')
      server.instance_variable_set(:@app, Jasmine::RailsRunAdapter.app(self)) # workaround for Rack bug, when Rack > 1.2.1 is released Rack::Server.start(:app => Jasmine.app(self)) will work
      server.start
    end

    def match_files(dir, patterns)
      dir = File.expand_path(dir)
      negative, positive = patterns.partition { |pattern| /^!/ =~ pattern }
      chosen, negated = [positive, negative].collect do |patterns|
        patterns.collect do |pattern|
          matches = Dir.glob(File.join(dir, pattern.gsub(/^!/, '')))
          matches.present? ? matches.collect { |f| f.sub("#{dir}/", "") }.sort : pattern
        end.flatten.uniq
      end
      chosen - negated
    end

    def browser
      ENV["JASMINE_BROWSER"] || 'chrome'
    end
  end
end

# Note - this is necessary for rspec2, which has removed the backtrace
module Jasmine
  class SpecBuilder
    def declare_spec(parent, spec)
      me = self
      example_name = spec["name"]
      @spec_ids << spec["id"]
      backtrace = @example_locations[parent.description + " " + example_name]
      parent.it example_name, {} do
        me.report_spec(spec["id"])
      end
    end
  end
end
