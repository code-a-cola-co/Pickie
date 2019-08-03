<style lang="scss">
  @import './assets/scss/base.scss';

  .pickie-date-picker {
    display: block;
    box-sizing: border-box;
    z-index: var(pickie-z-index);
  }
</style>

<template>
  <div class="pickie-date-picker" :style="baseStyles">

    <Pickie
      :date="date"
      :isWindowOpen="isWindowOpen"
      :position="position"
      :date-format="dateFormat"
      :allow-past="allowPast"
      :allow-future="allowFuture"
      :randomizer="randomizer"
      :accent-color="accentColor"
      :font-color="fontColor"
      :depth="depth"
      :z-index="zIndex"
      @dateChange="handleSetDate"
      @toggleWindow="handleToggleWindow">

      <input
        v-model="formattedDate"
        type="text"
        ref="field"
        name="pickie-date-picker"
        @focus="handleToggleWindow" />

    </Pickie>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Pickie from './components/Pickie.vue';
import {format} from 'date-fns';

@Component({
  components: {
    Pickie,
  },
})

export default class App extends Vue {
  @Prop(String) public startDate!: string;
  @Prop({type: String, default: 'bottom'}) public position!: string; // top, right, bottom, left, float
  @Prop({type: String, default: 'YYYY-mm-DD'}) public dateFormat!: string;
  @Prop({type: Boolean, default: true}) public allowPast!: boolean;
  @Prop({type: Boolean, default: true}) public allowFuture!: boolean;
  @Prop({type: String, default: '#5600ab'}) public accentColor!: string;
  @Prop({type: String, default: '#5600ab'}) public fontColor!: string;
  @Prop({type: Number, default: 5}) public depth!: string;
  @Prop({type: Number, default: 9999}) public zIndex!: string;

  public isWindowOpen: boolean = false;
  public date: Date = new Date();

  public get formattedDate(): string {
    return format(this.date, this.dateFormat);
  }

  public get baseStyles(): object {
    return {
      '--pickie-z-index': `${this.zIndex}`,
    };
  }

  public handleSetDate($event, value: Date): void {
    this.date = value;
  }

  public handleToggleWindow($event, value: boolean | undefined): void {
    value = value || undefined;
    if (value === undefined) {
      this.isWindowOpen = !(this.isWindowOpen);
      return;
    }
    this.isWindowOpen = value;
  }

  public mounted(): void {
    if (this.startDate && new Date(this.startDate)) {
      this.date = new Date(this.startDate);
    }
  }

}
</script>
