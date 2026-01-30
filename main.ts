/**
 * Mission 1 – Radio Interference
 */
//% color="#FF8000" weight=100 icon="\uf1eb"
namespace mission1 {

    let baseChannel = 0
    let pressCount = 0
    let triggerAt = 0
    let shifted = false
    let initialized = false

    /**
     * Mission radio interference controller
     * @param channel base radio channel
     */
    //% block="Mission station spatiale # %channel"
    //% channel.min=10 channel.max=30
    export function missionInterference(channel: number): void {

        if (initialized) return
        initialized = true

        baseChannel = channel
        pressCount = 0
        shifted = false
        triggerAt = randint(5, 8)

        radio.setGroup(baseChannel)

        input.onButtonPressed(Button.A, function () {
            pressCount++

            // ⚡ SHIFT TO +2 → INTERFERENCE
            if (!shifted && pressCount >= triggerAt) {
                radio.setGroup(baseChannel + 2)
                shifted = true
                sendInterference()
                showInterference()
            }
            // 🔁 RETURN TO BASE
            else if (shifted) {
                radio.setGroup(baseChannel)
                shifted = false
                pressCount = 0
                triggerAt = randint(5, 8)
            }
        })
    }

    // 📡 Send radio interference packets
    function sendInterference(): void {
        for (let i = 0; i < 5; i++) {
            radio.sendNumber(randint(1000, 9999))
            basic.pause(100)
        }
    }

    // ⚡ LED interference animation
    function showInterference(): void {
        basic.clearScreen()
        for (let i = 0; i < 10; i++) {
            led.plot(randint(0, 4), randint(0, 4))
            basic.pause(80)
        }
        basic.clearScreen()
    }
}
