module Jekyll
  module Paginate
    class PagerAll
      attr_reader :en_page, :cn_page


      def initialize(en_page=nil, cn_page=nil, all)
        @en_page = en_page
        @cn_page = cn_page
        @all = all
      end
=begin

      def initialize(en_page, all)
        @en_page = en_page
        @all = all
      end
      def initialize(cn_page, all)
        @en_page = cn_page
        @all = all
      end
      def initialize(all)
        @all = all
      end
=end

      def to_liquid
        {
          'en_page' => en_page,
          'cn_page' => cn_page,
          'all' => @all
        }
      end

    end
  end
end
