
Component({
  properties: {
    checked: {
      type: Boolean,
      value: false
    },

    loading: {
      type: Boolean,
      value: false
    },

    disabled: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    handleGeekSwitchChange: function handleGeekSwitchChange() {
      if (this.data.loading || this.data.disabled) {
        return;
      }
      var checked = !this.data.checked;
      this.triggerEvent('change', {
        checked: checked,
        loading: this.data.loading
      });
    }
  }
});
