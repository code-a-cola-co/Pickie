<style lang="scss">
  @import '../assets/scss/base.scss';

  .pickie-window {
    display: block;
    box-sizing: border-box;
    z-index: calc(var(pickie-z-index) + 1);
    width: 300px;
    height: 200px;
    padding: 10px;
    border-radius: 6px;
    background-color: rgba(255,255,255);

    &--top {

      &:after {
        content:'';
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 0;
        height: 0;
        border-top: solid 10px #e15915;
        border-left: solid 10px transparent;
        border-right: solid 10px transparent;
      }
    }

    &--right {


      &:after {
        content:'';
        position: absolute;
        top: 50%;
        left: 100%;
        right: 0;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-left: solid 10px #e15915;
        border-bottom: solid 10px transparent;
        border-right: solid 0px transparent;
        border-top: solid 10px transparent;
      }
    }

    &--bottom {

      &:after {
        content:'';
        position: absolute;
        bottom: 100%;
        left: 50%;
        right: 0;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-bottom: solid 10px #e15915;
        border-left: solid 10px transparent;
        border-top: solid 0px transparent;
        border-right: solid 10px transparent;
      }
    }

    &--left {

      &:after {
        content:'';
        position: absolute;
        top: 50%;
        right: 100%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-right: solid 10px #e15915;
        border-top: solid 10px transparent;
        border-left: solid 0px transparent;
        border-bottom: solid 10px transparent;
      }
    }

  }
</style>

<template>
  <div
    ref="pickie-window"
    v-model="isWindowOpen"
    :class="baseClass"
    :style="baseStyles">

    <FullDate
      :date="date"
      :allow-past="allowPast"
      :allow-future="allowFuture"
      :randomizer="randomizer"
      :accent-color="accentColor"
      :font-color="fontColor"
      v-if="picker === 'full'"
      @dateChange="handleSetDate"
      @pickerChange="handleSetPicker"
      @toggleWindow="handleToggleWindow" />

    <Day
      :date="date"
      :allow-past="allowPast"
      :allow-future="allowFuture"
      :accent-color="accentColor"
      :font-color="fontColor"
      v-if="picker === 'day'"
      @dateChange="handleSetDate"
      @pickerChange="handleSetPicker"
      @toggleWindow="handleToggleWindow"
      @toggleWindow="handleToggleWindow" />

    <Month
      :date="date"
      :allow-past="allowPast"
      :allow-future="allowFuture"
      :accent-color="accentColor"
      :font-color="fontColor"
      v-if="picker === 'month'"
      @dateChange="handleSetDate"
      @pickerChange="handleSetPicker"
      @toggleWindow="handleToggleWindow" />

    <Year
      :date="date"
      :allow-past="allowPast"
      :allow-future="allowFuture"
      :accent-color="accentColor"
      :font-color="fontColor"
      v-if="picker === 'year'"
      @dateChange="handleSetDate"
      @pickerChange="handleSetPicker"
      @toggleWindow="handleToggleWindow" />

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FullDate from './FullDate.vue';
import Day from './Day.vue';
import Month from './Month.vue';
import Year from './Year.vue';
import {format} from 'date-fns';
import Tether from 'tether';

@Component({
  components: {
    FullDate,
    Day,
    Month,
    Year,
  },
})

export default class Pickie extends Vue {
  @Prop(Boolean) public isWindowOpen!: boolean;
  @Prop(String) public position!: string;
  @Prop(String) public dateFormat!: string;
  @Prop(Boolean) public allowPast!: boolean;
  @Prop(Boolean) public allowFuture!: boolean;
  @Prop(String) public accentColor!: string;
  @Prop(String) public fontColor!: string;
  @Prop(Number) public depth!: string;
  @Prop(Number) public zIndex!: string;

  public picker: string = 'full';
  public date: Date = new Date();

  public get formattedDate(): string {
    return format(this.date, this.dateFormat);
  }

  public get baseClass(): string {
    return `pickie-window pickie-window-${this.position}`;
  }

  public get baseStyles(): object {
    return {
      '--pickie-z-index': `${this.zIndex}`,
    };
  }

  public handleSetPicker($event, value: string): void {
    this.picker = value;
  }

  public handleSetDate($event, value: Date): void {
    this.date = value;
    this.$emit('dateChange', format(value, this.dateFormat));
  }

  public handleToggleWindow($event, value: boolean | undefined): void {
    this.$emit('toggleWindow', value || undefined);
  }

  public mounted(): void {
    this.$emit('dateChange', this.formattedDate);
    if (this.position !== 'float') {
      new Tether({
        element: '.pickie-window',
        target: '.pickie-date-picker',
        attachment: `${this.position} center`,
      });
    }
  }

}
</script>
