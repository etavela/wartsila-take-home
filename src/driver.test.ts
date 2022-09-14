import { Battery } from './battery'
import { PowerCycleDriver } from './driver'
import { csvRow, readRows } from './reader'
import { inputCsvTransformer } from './transform'

const CAPACITY_KWH = 100
const INITIAL_CHARGE_PERCENT = 0.8
const EFFICIENCY_PERCENT = 0.9

interface ExpectedOutputRow {
  time: string
  power: string
  soc: string
}

const expectedOutputCsvTransformer = (
  row: csvRow<ExpectedOutputRow>
): ExpectedOutputRow => row

describe('PowerCycleDriver', () => {
  describe('runCycles', () => {
    test('should transform inputs to expected outputs', () => {
      const inputs = readRows('./power_over_time.csv', inputCsvTransformer)
      const driver = new PowerCycleDriver(
        new Battery(CAPACITY_KWH, INITIAL_CHARGE_PERCENT, EFFICIENCY_PERCENT)
      )
      const outputs = driver.runCycles(inputs)

      const expectedOutputs = readRows(
        './expected_soc_results.csv',
        expectedOutputCsvTransformer
      )

      const outputsToExpectedFormat = outputs.map((output) => {
        const { time, power, soc } = output
        return {
          time,
          power: String(power),
          soc: soc.toFixed(2)
        }
      })
      expect(outputsToExpectedFormat).toMatchObject(expectedOutputs)
    })
  })
})
