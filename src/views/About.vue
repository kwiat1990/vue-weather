<template>
  <div v-html="require(`!!html-loader!markdown-loader!../../README.md`)"></div>
</template>
