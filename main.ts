/**
 * Mission 1 Extension
 * Radio + interference + checkmark
 */
//% color="#FF8000" weight=100 icon="\uf1eb"
namespace mission1 {

    let baseChannel = 0
    let pressCount = 0
    let triggerAt = 0
    let shifted = false
    let initialized = false

    /**
     * Mission radio controller
     * Switches radio channel after random Button A presses
     * @param channel base radio channel
     */
    //% block="Mission radio controller on channel %channel"
    //% channel.min=0 channel.max=83
    export function missionRadio(channel: number): void {

        if (initialized) return
        initialized = true

        baseChannel = channel
        pressCount = 0
        shifted = false
        triggerAt = randint(5, 8)

        radio.setGroup(baseChannel)

        input.onButtonPressed(Button.A, function () {
            pressCount++

            // 🔀 SHIFT TO +2 (INTERFERENCE)
            if (!shifted && pressCount >= triggerAt) {
                radio.setGroup(baseChannel + 2)
                shifted = true
                showInterference()
            }
            // ✅ RETURN TO BASE (CHECKMARK)
            else if (shifted) {
                radio.setGroup(baseChannel)
                shifted = false
                pressCount = 0
                triggerAt = randint(5, 8)
                showCheckmark()
            }
        })
    }

    // ⚡ Interference animation
    function showInterference(): void {
        basic.clearScreen()
        for (let i = 0; i < 8; i++) {
            led.plot(randint(0, 4), randint(0, 4))
            basic.pause(120)
        }
        basic.clearScreen()
    }

    // ✅ Confirmation
    function showCheckmark(): void {
        basic.showIcon(IconNames.Yes)
        basic.pause(800)
        basic.clearScreen()
    }
}
