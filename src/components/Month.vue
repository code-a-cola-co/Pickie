<style lang="scss">
  @import '../assets/scss/base.scss';

  .pickie-month {
    box-sizing: border-box;


  }
</style>

<template>
  <div
    ref="pickie-month"
    class="pickie-month">

    <div
      class="pickie-month__back"
      @click="handleSetPicker('full')"></div>

    <div
      class="pickie-month__close"
      @click="handleToggleWindow(false)"></div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
  },
})

export default class Month extends Vue {
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
