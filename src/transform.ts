import { PowerCycleInput } from './driver'
import { csvRow } from './reader'

/**
 * Transformation function useful for reading the expected PowerCycleInput format
 * from a CSV file.
 *
 * @param row string values for PowerCycleInput read in readRows()
 * @returns the equivalent PowerCycleInput value
 */
export const inputCsvTransformer = (
  row: csvRow<PowerCycleInput>
): PowerCycleInput => ({
  time: row.time,
  power: Number(row.power)
})
