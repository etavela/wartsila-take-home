import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { Battery } from './battery'

dayjs.extend(customParseFormat)

/**
 * Specifies the power transferred since the previous input's timepoint
 */
export interface PowerCycleInput {
  /**
   * Timepoint in the format [h]h:mm
   */
  time: string

  /**
   * Average power discharged (positive) or charged (negative)
   */
  power: number
}

/**
 * For a given PowerCycleInput adds the state-of-charge calculated for the cycle.
 */
export interface PowerCycleOutput extends PowerCycleInput {
  /**
   * The current state-of-charge as a decimal representing the percentage of
   * total capacity available after application of this cycle.
   */
  soc: number
}

/**
 * Runs a series of power cycles for a given battery and provides the
 * state-of-charge at each as output
 */
export class PowerCycleDriver {
  /**
   * @param battery - the battery to be exercised by the driver
   */
  constructor(private battery: Battery) {}

  private parseTime(time: string) {
    return dayjs(time, 'h:mm')
  }

  /**
   * Runs a series of power cycles against the driver's battery.
   *
   * @param inputs - run these discharges/charges in series. The first input is
   *                 used to set the time-series baseline - any power value in
   *                 this entry will be ignored.
   * @returns for each input returns the source input values with the resulting
   *          state-of-charge
   */
  public runCycles(inputs: PowerCycleInput[]): PowerCycleOutput[] {
    let lastInput: PowerCycleInput
    return inputs.map((input) => {
      if (lastInput) {
        const start = this.parseTime(lastInput.time)
        const end = this.parseTime(input.time)
        const durationHours = end.diff(start, 'minute') / 60
        this.battery.transfer(durationHours, input.power)
      }
      const soc = this.battery.getStateOfChargePercent()
      lastInput = input
      return { ...input, soc }
    })
  }
}
