<template>
  <li
    role="option"
    class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-primary"
    :class="{ checked }"
    @click="handleClick"
  >
    <div class="flex items-center space-x-3">
      <slot>{{ label }}</slot>
    </div>

    <span
      v-show="checked"
      class="absolute inset-y-0 right-0 flex items-center pr-4"
    >
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
  </li>
</template>

<script>
export default {
  inject: {
    select: {
      default: null,
    },
  },
  props: {
    value: {},
    label: String,
  },
  computed: {
    checked() {
      if (this.select) {
        return this.select.isSelected(this)
      }
      return false
    },
  },
  mounted() {
    if (this.select) {
      this.select.options.push(this)
      this.select.getSelectedOptions()
    }
  },
  beforeDestroy() {
    if (this.select) {
      const index = this.select.options.findIndex((e) => e === this)
      this.select.options.splice(index, 1)
      this.select.getSelectedOptions()
    }
  },
  methods: {
    handleClick() {
      if (this.select) {
        this.select.selectOption(this)
      }
    },
  },
}
</script>
