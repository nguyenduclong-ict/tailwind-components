<template>
  <div class="container mx-auto">
    <FormItem label="Select single">
      <Select v-model="value">
        <Option
          v-for="option in options"
          :key="option.id"
          :value="option.id"
          :label="option.name"
        ></Option>
      </Select>
    </FormItem>

    <FormItem label="Select multiple">
      <Select v-model="value2" multiple>
        <Option
          v-for="option in options"
          :key="option.id"
          :value="option.id"
          :label="option.name"
        ></Option>
      </Select>
    </FormItem>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: null,
      value2: [1, 1, 1],
      options: [
        {
          name: 'Nguyễn Đức Long',
          id: 1,
        },
        {
          name: 'Nguyễn Văn Thường',
          id: 2,
        },
        {
          name: 'Đặng Tuấn Dương',
          id: 3,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
