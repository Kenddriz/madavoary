<template>
  <ul :style="`padding-inline-start: ${$q.screen.gt.sm ? '25px' : '0'}`">
    <li
      v-for="(item, index) in items"
      :key="index"
    >
      <span>{{ index + 1 }}</span>
      {{ item }}
    </li>
  </ul>
</template>

<script lang="ts">
  export default {
    name: 'OrderedList',
    props: {
      items: Array
    }
  }
</script>

<style lang="scss" scoped>

  ul {
    position: relative;
    li {
      list-style: none;
      padding: 10px;
      transition: transform 0.5s;
      span {
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        background: #044973;
        color: #fff;
        display: inline-block;
        border-radius: 50%;
        margin-right: 10px;
        font-size: 12px;
        font-weight: 600;
        transform: translateY(-2px);
      }
    }
  }

  ul:hover li {
    opacity: 0.5;
  }

  ul li:hover {
    transform: scale(1.02);
    z-index: 100;
    background: #044973;
    color: #fff;
    opacity: 1;
  }
  ul li:hover span {
    background: #fff;
    color: #044973;
  }
</style>
