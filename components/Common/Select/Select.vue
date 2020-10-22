<template>
  <div class="relative">
    <span class="inline-block w-full rounded-md shadow-sm">
      <button
        ref="button"
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        class="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
        @click="toggle"
        @blur="close"
      >
        <div class="flex items-center space-x-3">
          <span class="block truncate"> Tom Cook </span>
        </div>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M7 7l3-3 3 3m0 6l-3 3-3-3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
    </span>

    <!-- List Option -->
    <transition name="fade">
      <div
        v-show="visible"
        ref="list-options"
        class="absolute mt-1 w-full rounded-md bg-white shadow-lg"
        @mouseenter="open"
      >
        <ul
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-item-3"
          class="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
        >
          <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
        -->
          <slot />
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { compare, remove, removeItem } from '~/utils/lodash'
export default {
  props: {
    multiple: Boolean,
    multipleLimit: Number,
    value: {},
  },
  provide() {
    return {
      select: this,
    }
  },
  data() {
    return {
      visible: false,
      selectedOptions: [],
      options: [],
    }
  },
  computed: {
    config() {
      return {}
    },
  },
  watch: {
    value: {
      handler() {
        this.getSelectedOptions()
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    toggle() {
      this.visible = !this.visible
    },
    close() {
      this.visible = false
    },
    open() {
      this.visible = true
    },
    selectOption(option) {
      if (this.multiple) {
        const value = this.value || []
        const index = this.selectedOptions.findIndex((opt) => opt === option)
        if (index >= 0) {
          removeItem(
            this.selectedOptions,
            option,
            (v) => v.value === option.value
          )
          remove(value, (v) => v === option.value)
        } else {
          this.selectedOptions.push(option)
          value.push(option.value)
        }
        this.$emit('input', value)
      } else {
        this.selectedOptions.splice(0)
        this.selectedOptions.push(option)
        this.$emit('input', option.value)
      }
    },
    isSelected(option) {
      return this.selectedOptions.includes(option)
    },
    getSelectedOptions() {
      const selectedOptions = []
      this.options.forEach((option) => {
        if (this.multiple) {
          if ((this.value || []).some((v) => v === option.value)) {
            selectedOptions.push(option)
          }
        } else if (this.value === option.value) {
          selectedOptions.push(option)
        }
      })
      this.selectedOptions.splice(0, undefined, ...selectedOptions)
    },
  },
}
</script>
