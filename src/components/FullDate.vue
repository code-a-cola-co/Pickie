<style lang="scss">
  @import '../assets/scss/base.scss';

  .pickie-fulldate {
    box-sizing: border-box;


  }
</style>

<template>
  <div
    ref="pickie-fulldate"
    class="pickie-fulldate">

    <div
      class="pickie-fulldate__close"
      @click="handleToggleWindow(false)"></div>

    <div class="pickie-fulldate__month">

      <div
        v-if="allowPast"
        @click="handleSetMonth({action: 'sub', value: 1})"
        class="pickie-fulldate__month__previous"></div>

      <div
        @click="handleSetPicker('month')"
        class="pickie-fulldate__month__date">
        {{ date | currentMonth }}
      </div>

      <div
        v-if="allowFuture"
        @click="handleSetMonth({action: 'add', value: 1}"
        class="pickie-fulldate__month__next"></div>

    </div>

    <div class="pickie-fulldate__day">

      <div
        v-if="allowPast"
        @click="handleSetDay({action: 'sub', value: 1})"
        class="pickie-fulldate__day__previous"></div>

      <div
        @click="handleSetPicker('day')"
        class="pickie-fulldate__day__date">
        {{ date | currentDay }}
      </div>

      <div
        v-if="allowFuture"
        @click="handleSetDay({action: 'add', value: 1})"
        class="pickie-fulldate__day__next"></div>

    </div>

    <div class="pickie-fulldate__year">

      <div
        v-if="allowPast"
        @click="handleSetYear({action: 'sub', value: 1})"
        class="pickie-fulldate__year__previous"></div>

      <div
        @click="handleSetPicker('year')"
        class="pickie-fulldate__year__date">
        {{ date | currentYear }}
      </div>

      <div
        v-if="allowFuture"
        @click="handleSetYear({action: 'add', value: 1})"
        class="pickie-fulldate__year__next"></div>

    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {
  format,
  addDays,
  addMonths,
  addYears,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';

interface IDateFunction {
  action: string;
  value: number;
}

@Component({
  filters: {
    currentDay(value) {
      return format(value, 'DD');
    },
    currentMonth(value) {
      return format(value, 'mm');
    },
    currentYear(value) {
      return format(value, 'YY');
    },
  },
  components: {
  },
})

export default class FullDate extends Vue {
  @Prop(Date) public date!: Date;
  @Prop(Boolean) public allowPast!: boolean;
  @Prop(Boolean) public allowFuture!: boolean;
  @Prop(String) public accentColor!: string;
  @Prop(String) public fontColor!: string;

  public handleSetYear($event, {action, value}: IDateFunction): void {
    const newDate = action === 'add'
      ? addYears(this.date, value)
      : subYears(this.date, value);
    this.$emit('dateChange', newDate);
  }

  public handleSetMonth($event, {action, value}: IDateFunction): void {
    const newDate = action === 'add'
      ? addMonths(this.date, value)
      : subMonths(this.date, value);
    this.$emit('dateChange', newDate);
  }

  public handleSetDay($event, {action, value}: IDateFunction): void {
    const newDate = action === 'add'
      ? addDays(this.date, value)
      : subDays(this.date, value);
    this.$emit('dateChange', newDate);
  }

  public handleSetPicker($event, value: string): void {
    this.$emit('pickerChange', value);
  }

  public handleToggleWindow($event, value: boolean | undefined): void {
    this.$emit('toggleWindow', value || undefined);
  }

}
</script>
