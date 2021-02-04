#功能：类别区分中英文，即计算某类别下中文文章数量和某类别下英文文章数量
#需要的配置
#   post的front matter 中配置en:true(英文) 或者cn:true（中文）
#   _config.yml 配置项： category_language（需要被忽略的类别）
#数据结构:
#     {
#       'cat-lang':{
#         'cat-lang-en':{
#           'cat1':1
#         },
#         'cat-lang-cn':{
#           'cat1':1
#         }
#       }
#     }

module Jekyll
  module CategoryLanguage
    class CategoryLanguage < Generator
      def generate(site)
        en = Hash.new { |h, key| h[key] = [] }
        cn = Hash.new { |h, key| h[key] = [] }

        site.posts.docs.each do |post|
          post.data['categories'].each do |cat|
            if post.data['en']
              if en.has_key?(cat)
                en[cat]+=1
              else
                en[cat]=1
              end
            end

            if post.data['cn']
              if cn.has_key?(cat)
                cn[cat]+=1
              else
                cn[cat]=1
              end
            end

          end
        end

        remove_cat =site.config['category_language']
        remove_cat.each do |rc|
          en.delete(rc)
          cn.delete(rc)
        end

        result =Hash.new { |h, key| h[key] = [] }
        result['cat-lang-en']=en
        result['cat-lang-cn']=cn
        site.data['cat-lang'] = result

      end
    end
  end
end
