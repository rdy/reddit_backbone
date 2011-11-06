require 'spec_helper'

describe CommentsController do
  context 'with an expected VCR cassette' do
    use_vcr_cassette 'comments'

    context 'when the format is json' do
      context 'when a permalink is specified' do

      end
      context 'when no permalink is specified' do
        before do
          get :show, format: :json
        end

        it { response.should_not be_success }
      end
      describe 'GET #show' do
        before do
          get :show, format: :json, permalink: '/r/pics/comments/m1yc5/no_paula_its_a_pot/'
        end

        it { response.should be_success }
        it { assigns[:comments].should be_present }
        it { response.body.should == assigns[:comments].to_json }
      end
    end
  end
end
