<template>
  <div class="md:relative">
    <div
      class="group"
      :class="{
        'md:mr-44': errorPosition == 'right',
      }"
    >
      <!-- <div
        class="absolute top-0 z-10 w-full -mt-8 text-xs text-red-500"
        v-if="err"
      >
        {{ err }}
      </div> -->
      <div class="floating-form">
        <div class="relative floating-input">
          <input
            class="w-full h-12 p-3 pt-6 pl-2 text-base font-light tracking-wider bg-gray-100 border border-none rounded shadow hover:bg-white ring-1 focus:ring-2 floating-input focus:outline-none"
            :class="
              err
                ? 'focus:ring-red-500 focus:ring-offset-0 border-2 border-red-500 bg-red-100'
                : ''
            "
            placeholder=" "
            v-bind="$attrs"
            :value="value"
            @input="
              $emit('input', $event.target.value)
              v ? v.$touch() : ''
            "
            :type="type"
            :aria-label="label"
          />
          <span class="highlight"></span>
          <label
            class="absolute text-base font-light"
            :class="err ? 'text-red-500' : 'text-gray-500'"
          >
            {{ label }}
          </label>
          <div
            :class="err ? 'absolute block top-0 right-0 pt-3 pr-2' : 'hidden'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <div
          v-if="err"
          class="items-center block mt-1 text-sm text-red-500 md:hidden"
        >
          <span>{{ err }}</span>
        </div>
        <div
          v-if="err"
          class="md:absolute"
          :class="{
            '-left-1 top-0.5 hidden md:flex items-center':
              errorPosition == 'left',
            ' -right-1 top-0.5 hidden md:flex items-center':
              errorPosition == 'right',
            'right-0 bottom-14 hidden md:block': errorPosition == 'up',
            ' left-0 top-14  hidden md:block': errorPosition == 'down',
          }"
        >
          <div
            class="p-3 text-xs text-gray-600 bg-white border-2 border-red-500 rounded-md"
          >
            <span>{{ err }}</span>
          </div>
          <div
            class="absolute"
            :class="{
              'arrow-right -right-1': errorPosition == 'left',
              'arrow-left -left-1': errorPosition == 'right',
              'arrow-down left-4': errorPosition == 'up',
              'arrow-up left-4 bottom-11': errorPosition == 'down',
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errorPosition: { type: String, default: 'left' },
    label: { type: String },
    err: { type: String },
    type: { type: String, default: 'text' },
    value: { type: [Number, String] },
    cls: { type: String },
    placeholder: { type: String },
    validate: { type: String },
    v: {
      type: Object,
      required: false,
    },
    err: {
      type: String,
      required: false,
    },
  },
}
</script>

<style scoped>
.arrow-left {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 5px 5px 0;
  border-color: transparent red transparent transparent;
}
.arrow-right {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 5px;
  border-color: transparent transparent transparent red;
}
.arrow-up {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid red;
}
.arrow-down {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid red;
}
.floating-input {
  font-size: 0.875rem;
}
.floating-input:focus ~ label,
.floating-input:not(:placeholder-shown) ~ label {
  top: -2px;
  color: #b26e12;
  font-size: 0.8rem;
}

label {
  pointer-events: none;
  left: 8px;
  top: 11px;
  transition: 0.2s ease all;
}
</style>
