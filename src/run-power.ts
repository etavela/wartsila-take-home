#!/usr/bin/env npx ts-node
/*
 * Wärtsilä Battery Take Home script implementation
 *
 * Takes the path to an input CSV in the format specified in the exercise as
 * the sole argument and writes the input values and calculated state-of-charge
 * to the console.
 */

import { Command } from 'commander'

import { Battery } from './battery'
import { PowerCycleDriver, PowerCycleOutput } from './driver'
import { readRows } from './reader'
import { inputCsvTransformer } from './transform'

const CAPACITY_KWH = 100
const INITIAL_CHARGE_PERCENT = 0.8
const EFFICIENCY_PERCENT = 0.9

function writeOutputs(outputs: PowerCycleOutput[]) {
  console.log('Time,Power,SOC')
  outputs.forEach((output) => {
    const { time, power, soc } = output
    console.log(`${time},${power},${soc.toFixed(2)}`)
  })
}

function runCycles(inputFilepath: string) {
  const battery = new Battery(
    CAPACITY_KWH,
    INITIAL_CHARGE_PERCENT,
    EFFICIENCY_PERCENT
  )
  const driver = new PowerCycleDriver(battery)
  const inputs = readRows(inputFilepath, inputCsvTransformer)
  const outputs = driver.runCycles(inputs)
  writeOutputs(outputs)
}

new Command()
  .usage('<inputFile>')
  .arguments('<inputFile>')
  .action(runCycles)
  .parse()
