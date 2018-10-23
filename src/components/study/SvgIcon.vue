<template>
  <svg :class="svgClass">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
export default {
  props: {
    iconClass: {
      required: true,
      type: String
    },
    className: {
      default: '',
      type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (!this.className) {
        return 'svg-icon';
      } else {
        return `svg-icon ${this.className}`;
      }
    }
  }
}
</script>
