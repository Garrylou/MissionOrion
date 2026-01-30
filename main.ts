/**
 * Mission 1 – Radio Interference (Count-based)
 */
//% color="#FF8000" weight=100 icon="\uf1eb"
namespace mission1 {

    let baseChannel = 0
    let sendCount = 0
    let triggerAt = 0
    let shifted = false
    let initialized = false

    /**
     * Mission radio interference controller
     * @param channel base radio channel
     */
    //% block="Mission radio interference on channel %channel"
    //% channel.min=0 channel.max=83
    export function missionInterference(channel: number): void {

        if (initialized) return
        initialized = true

        baseChannel = channel
        sendCount = 0
        shifted = false
        triggerAt = randint(4, 6)

        radio.setGroup(baseChannel)
    }

    /**
     * Send a radio number (mission-controlled)
     * @param value number to send
     */
    //% block="Mission send number %value"
    export function missionSend(value: number): void {

        // Student controls WHAT and WHEN
        radio.sendNumber(value)
        sendCount++

        // ⚡ Trigger interference
        if (!shifted && sendCount >= triggerAt) {
            radio.setGroup(baseChannel + 2)
            shifted = true
            sendInterference()
            showInterference()
        }
        // 🔁 Return to base after next send
        else if (shifted && sendCount >= triggerAt + 1) {
            radio.setGroup(baseChannel)
            shifted = false
            sendCount = 0
            triggerAt = randint(4, 6)
        }
    }

    // 📡 Interference packets
    function sendInterference(): void {
        for (let i = 0; i < 5; i++) {
            radio.sendNumber(randint(1000, 9999))
        }
    }

    // ⚡ LED interference animation
    function showInterference(): void {
        basic.clearScreen()
        for (let i = 0; i < 10; i++) {
            led.plot(randint(0, 4), randint(0, 4))
            basic.pause(60)
        }
        basic.clearScreen()
    }
}
