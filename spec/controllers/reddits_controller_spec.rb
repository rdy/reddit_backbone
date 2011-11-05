require 'spec_helper'

describe RedditsController do
  context 'with an expected VCR cassette' do
    use_vcr_cassette 'reddits'
    describe 'GET #index' do
      before do
        get :index
      end

      it { response.should be_success }
      it { assigns[:reddits].should be_present }
    end
  end
end
