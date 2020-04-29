<template>
  <div class="">
    <header-sub  @getLists="getLists" :headerSubs="navLists" />
    <div class="container books">
      <books-list :lists="lists" />
      <books-right />
    </div>
  </div>
</template>
<script>
import headerSub from '@/components/books/header-sub'
import booksList from '@/components/books/books-list'
import booksRight from '@/components/books/books-right'
import booksAPI from '@/api/books'
import scroll from '@/mixins/scroll'
export default {
  name: '',
  components: {
    headerSub,
    booksList,
    booksRight
  },
  props: ["id"],
  mixins: [scroll],
  data () {
    return {
      navLists: [],
      lists: [
        {
          _id: "5da91710f265da5ba674c009",
          section: ["5dfc27f8e51d45584e5893ec", "5dfc280151882512400ae03e", "5dfc280a518825127e6f9d8b",],
          desc: "理论结合实践，帮助开发者全方位地掌握现代 理论结合实践，帮助开发者全方位地掌握现代理论结合实践，帮助开发者全方位地掌握现代Web 技术体系中的 PWA 架构。",
          user: "5bea2089e51d452acb74f679",
          price: 19.9,
          title: "深入浅出 PWA",
          buyCount: 570,
          viewCount: 0,
          contentSize: 148784,
          img: "https://user-gold-cdn.xitu.io/2020/3/24/1710a9b9b1971a6a?w=1950&h=2730&f=png&s=1299481",
          category: "5562b415e4b00c57d9b94ac8",
          tags: ["58b4f01c2f301e00576dfc78"],
          createdAt: "2020-03-24T03:35:23.599Z",
          updatedAt: "2020-03-24T16:24:28.126Z",
          finishedAt: "2019-11-15",
          isFinished: true,
          isDeleted: false,
          isHot: false,
          isPublish: 2,
          isShow: true,
          profile: "启业云架构师，Taro 项目组成员",
          lastSectionCount: 25,
          pv: 400,
          wechatSignal: "pwa",
          wechatImg: "https://user-gold-cdn.xitu.io/158497673066373348b4fef7c779f1b05063c8f1453f4.jpg",
          wechatImgDesc: "小册九姐",
          url: "https://user-gold-cdn.xitu.io/158502158134115759f938d79ef757ac46619229bc168.jpg",
          navId: ["49"],
          isTop: false,
          isEditor: false,
          isBuy: false,
          readLog: {sectionId: "", sign: ""},
          userData: {
            role: "guest",
            username: "元宵大师",
            selfDescription: "公众号《元宵大师带你用Python量化交易》作者，致力于Python量化交易策略的设计和开发",
            jobTitle: "资深Python数据分析师",
            company: "",
            avatarHd: "",
            avatarLarge: "https://user-gold-cdn.xitu.io/2019/3/2/1693db677ad1c273?w=580&h=435&f=jpeg&s=15900",
            mobilePhoneVerified: true,
            isAuthor: "",
            isXiaoceAuthor: "1",
            bookletCount: 1,
            objectId: "5c6a7313f265da2dde06df43",
            uid: "5c6a7313f265da2dde06df43",
            level: 2,
          },
          id: "5da91710f265da5ba674c009",
        }
      ],
      alias: '',
      pageNum: 0
    }
  },
  created () {
    this.getNavLists()
    this.getLists(this.id);
    this.alias = this.id;
    console.log(this.alias);
  },
  methods: {
    reset() {
      this.alias = '';
      this.pageNum = 0;
      this.lists = [];
    },
    async getNavLists() {
      let {s, d} = await booksAPI.navList();
      if(s === 1){
        this.navLists = [
          {
            id: "0",
            name: "全部",
            score: "0",
            createdAt: "2018-08-21T15:11:46.000Z",
            alias: "",
          },
          ...d
        ];
      }
    },
    async getLists(type) {
      console.log(type);
      
      if(type){
        this.reset();
        this.alias = type;
      }else{
        this.alias = ""
      }
      let {s, d} = await booksAPI.lists(this.alias, ++this.pageNum);
      if(s === 1){
        this.lists = this.lists.concat(d);
      }
    }
  }
}
</script>
<style scoped lang="less">
.container{
  background-color: inherit;
}
.books{
  margin-top: 6rem;
  .flex();
}
</style>
