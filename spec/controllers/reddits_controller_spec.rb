require 'spec_helper'

describe RedditsController do
  context 'with an expected VCR cassette' do
    use_vcr_cassette 'reddits'

    context 'when the format is html' do
      describe 'GET #show' do
        before do
          get :index
        end

        it { response.should be_success }
      end
    end

    context 'when the format is json' do
      describe 'GET #index' do
        before do
          get :index, format: :json
        end

        it { response.should be_success }
        it { assigns[:reddits].should be_present }
        it { response.body.should == assigns[:reddits].to_json }
      end
    end
  end
end
