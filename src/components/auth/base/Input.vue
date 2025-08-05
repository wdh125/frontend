<template>
  <div class="d-flex flex-column">
    <label :for="id" class="label">{{label}}</label>
    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      class="input"
      @input="handleInput"
      @focus="$emit('focus', $event)"
      @keyup="$emit('keyup', $event)"
      required
      style="color: #353535 !important; background: #fff !important; caret-color: #6A4029 !important; pointer-events: auto !important; opacity: 1 !important;"
    >
  </div>
</template>

<script>
export default {
	name: 'Inputed',
	props: {
		id: String,
		type: String,
		placeholder: String,
		label: String,
		modelValue: {
			type: [String, Number],
			default: ''
		}
	},
	methods: {
		handleInput(event) {
			console.log('Input event:', event.target.value)
			this.$emit('update:modelValue', event.target.value)
		}
	}
}
</script>

<style lang="scss" scoped>

.input {
  height: 75px;
  border: 1px solid #4F5665;
  border-radius: 20px;
  padding: 0 30px;
  margin: 0 0 32px 0;

  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  // line-height: 24px;
  color: #353535;
  cursor: text;
}

.input:focus {
  outline: none;
  border-color: #6A4029;
  cursor: text;
}

.placeholder::placeholder {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #9F9F9F;
}

.label {
  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  color: #4F5665;
}

</style>
