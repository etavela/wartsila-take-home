import { parse } from 'csv-parse/sync'
import fs from 'fs'

/**
 * The expected CSV row input format for a type
 *
 * @typeParam T - CSV input data expected to be this type
 */
export type csvRow<T> = Record<keyof T, string>

/**
 * Function defintion for a transformation used to convert CSV input (array of strings)
 * into the corresponding object type.
 *
 * @typeParam T - transform to this type
 * @param input - a single row of CSV input
 * @returns the transformed object
 */
export type transformer<T> = (input: csvRow<T>) => T

/**
 * Reads a given CSV file and returns the content as an array of objects of the
 * expected type.
 *
 * @typeParam T - type of objects to read from the input file
 * @param inputFilepath - path to the input CSV file
 * @param transformer - function to transform the CSV row array of strings to type T
 * @returns the CSV content as an array of objects of type T
 */
export function readRows<T>(
  inputFilepath: string,
  transformer: transformer<T>
): T[] {
  const input = fs.readFileSync(inputFilepath)
  return parse(input, {
    columns: (header: string[]) =>
      header.map((label) => label.toLocaleLowerCase())
  }).map(transformer)
}
