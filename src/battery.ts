/**
 * Represents a battery that holds an electric charge that may be charged or
 * discharged over time.
 */
export class Battery {
  private currentChargeKwh: number

  /**
   * Instantiate a new battery.
   *
   * @param capacityKwh - total capacity
   * @param initialChargePercent - initial charge as a percentage (decimal) of
   *  total capacity
   * @param efficiencyPercent - efficiency of power transfer as a
   *  percentage (decimal) of energy retained in a transfer
   */
  constructor(
    private capacityKwh: number,
    initialChargePercent: number,
    private efficiencyPercent: number
  ) {
    this.currentChargeKwh = initialChargePercent * capacityKwh
  }

  private discharge(durationHours: number, powerKw: number) {
    this.currentChargeKwh = Math.max(
      this.currentChargeKwh -
        (powerKw * durationHours) / this.efficiencyPercent,
      0
    )
  }

  private charge(durationHours: number, powerKw: number) {
    this.currentChargeKwh = Math.min(
      this.currentChargeKwh + -powerKw * durationHours * this.efficiencyPercent,
      this.capacityKwh
    )
  }

  /**
   * Charge or discharge power to/from the battery.
   *
   * @param durationHours - length of the period that power is transferred
   *  as a number of hours (may be fractional)
   * @param powerKw - average power drawn during durationHours
   */
  public transfer(durationHours: number, powerKw: number): void {
    if (powerKw > 0) {
      this.discharge(durationHours, powerKw)
    } else {
      this.charge(durationHours, powerKw)
    }
  }

  /**
   * Provides the current state-of-charge
   *
   * @returns the state of charged expressed as a decimal percentage
   *          (e.g. 0.9 for 90% of capacity)
   */
  public getStateOfChargePercent(): number {
    return this.currentChargeKwh / this.capacityKwh
  }
}
