<script>
// <Interval delay="10m" @tick="doSomething()" immediate />
//   delay = 100[ms|s|m|h|d]  - default is ms
//   immediate = true/false, emit the 'tick' event immediately upon creation
export default {
  props: {
    delay: {
      required: true,
    },
    immediate: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    delayMs() {
      const [v, t, u] = this.delay.match(/^([\d.]+)(ms|s|m|h|d)?$/);
      console.log(v)
      const multiplesOfMs = {
        ms: 1,
        s: 1000,
        m: 1000 * 60,
        h: 1000 * 60 * 60,
        d: 1000 * 60 * 60 * 24
      };
      // console.log({t, u, d: t * multiplesOfMs[u || 'ms']});
      return t * multiplesOfMs[u || 'ms']; // default is ms.
    },
  },
  mounted() {
    this.intervalId = setInterval(() => this.$emit('tick'), this.delayMs);
    if (this.immediate) this.$emit('tick');
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  watch: {
    delay() {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => this.$emit('tick'), this.delayMs);
    },
  },
  render: () => null,
}
</script>