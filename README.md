# wartsila-take-home

This project implements a script to calculate the state-of-charge of a simulated
battery as specified in the Wärtsilä Battery Take Home Question PDF.

The solution is implemented as a ts-node script supported by a few additional modules.
The instructions do specify "single-file code" and an equivalent function signature: 
`calculateSoc(hour: float, power: int, currentSoc: float) -> float`.

In keeping with the instruction to "Add any comments and structure that you would 
normally add to a production code-base" I've implemented a more modular, object-oriented
approach.

If favorable evaluation is contingent on following the letter of the law, I'm willing
to re-implement along those lines :)

## Execution

The script `run-power.ts` takes the path to an input file as its sole argument, e.g.

    ./src/run-power.ts ./power-over-time.csv

## Test

There's a simple Jest test to verify that the code generates the expected outputs
when configured according to the PDF. Invoke via:

    npm test