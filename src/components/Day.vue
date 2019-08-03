<style lang="scss">
  @import '../assets/scss/base.scss';

  .pickie-day {
    box-sizing: border-box;


  }
</style>

<template>
  <div
    ref="pickie-day"
    class="pickie-day">

    <div
      class="pickie-day__back"
      @click="handleSetPicker('full')"></div>

    <div
      class="pickie-day__close"
      @click="handleToggleWindow(false)"></div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
  },
})

export default class Day extends Vue {
  @Prop(Date) public date!: Date;
  @Prop(Boolean) public allowPast!: boolean;
  @Prop(Boolean) public allowFuture!: boolean;
  @Prop(String) public accentColor!: string;
  @Prop(String) public fontColor!: string;

  public handleSetPicker($event, value: string): void {
    this.$emit('pickerChange', value);
  }

  public handleToggleWindow($event, value: boolean | undefined): void {
    this.$emit('toggleWindow', value || undefined);
  }

}
</script>
