<template>
  <div>
    <div
      v-for="tab in tabs"
      :key="tab"
      :class="['tab-button', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
      {{ tab }}
    </div>
    <component :is="tabs" class="tab"></component>
    <component v-for="item in tabs" :key="item" :is="item" ></component>

  </div>
</template>

<script>
  export default {
    components: {
      // "tab-a": ()=>import('./A.vue'),
      "b":  ()=>import('./B.vue'),
      "c": ()=>import('./C.vue'),
    },
    data() {
      return {
        currentTab: "a",
        tabs: ["b", "c"]
      }
    },
    computed: {
      // currentTabComponent: function() {
      //   return "tab-" + this.currentTab.toLowerCase();
      // }
    }
  }
</script>