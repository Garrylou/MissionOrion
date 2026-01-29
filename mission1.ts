/**
 * Mission 1 Extension
 * Adds a checkmark controller triggered by Button A
 */
//% weight=100 color="#FF8000" icon="\uf1eb" blockNamespace="Mission 1"
namespace mission1 {

    let pressCount = 0
    let triggerPresses = 0

    /**
     * Mission checkmark controller
     */
    //% block="Mission checkmark controller"
    //% color="#FF8000" icon="\uf1eb"
    export function missionCheckmark() {

        pressCount = 0
        triggerPresses = randint(5, 8) // random presses to trigger

        input.onButtonPressed(Button.A, function () {
            pressCount++

            if (pressCount >= triggerPresses) {
                // Show checkmark randomly on the matrix
                let x = randint(0, 4)
                let y = randint(0, 4)

                basic.clearScreen()
                led.plot(x, y) // flash one LED first
                basic.pause(100)
                basic.showIcon(IconNames.Yes) // full checkmark
                basic.pause(500)
                basic.clearScreen()

                // Reset counter
                pressCount = 0
                triggerPresses = randint(5, 8)
            }
        })
    }
}
