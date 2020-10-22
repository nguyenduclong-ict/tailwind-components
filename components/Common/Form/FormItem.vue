<template>
  <div class="space-y-1">
    <label
      id="listbox-label"
      class="block text-sm leading-5 font-medium text-gray-700"
    >
      <slot name="lable">
        {{ label || '&nbsp;' }}
      </slot>
    </label>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
  },
}
</script>

<style></style>
