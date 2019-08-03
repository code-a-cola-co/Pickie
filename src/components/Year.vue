<style lang="scss">
  @import '../assets/scss/base.scss';

  .pickie-year {
    box-sizing: border-box;


  }
</style>

<template>
  <div
    ref="pickie-year"
    class="pickie-year">

    <div
      class="pickie-year__back"
      @click="handleSetPicker('full')"></div>

    <div
      class="pickie-year__close"
      @click="handleToggleWindow(false)"></div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
  },
})

export default class Year extends Vue {
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
