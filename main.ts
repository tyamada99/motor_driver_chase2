function 左回転 () {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, スピード + バランス)
    pins.analogWritePin(AnalogPin.P15, スピード + バランス)
    pins.analogWritePin(AnalogPin.P16, 0)
}
input.onButtonPressed(Button.A, function () {
    電源 += 1
    if (電源 == 2) {
        電源 = 0
    }
})
function バック () {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, スピード + バランス)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, スピード + バランス)
}
function 左の距離を測る () {
    pins.servoWritePin(AnalogPin.P2, 45)
    basic.pause(500)
    左の距離 = 0
    while (左の距離 == 0) {
        左の距離 = sonar.ping(
        DigitalPin.P0,
        DigitalPin.P1,
        PingUnit.Centimeters
        )
    }
    return 左の距離
}
function 右の距離を測る () {
    pins.servoWritePin(AnalogPin.P2, 135)
    basic.pause(500)
    右の距離 = 0
    while (右の距離 == 0) {
        右の距離 = sonar.ping(
        DigitalPin.P0,
        DigitalPin.P1,
        PingUnit.Centimeters
        )
    }
    return 右の距離
}
function 前進 () {
    pins.analogWritePin(AnalogPin.P12, スピード + バランス)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P15, スピード + バランス)
    pins.analogWritePin(AnalogPin.P16, 0)
}
function 右回転 () {
    pins.analogWritePin(AnalogPin.P12, スピード + バランス)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, スピード + バランス)
}
function 停止 () {
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
    pins.analogWritePin(AnalogPin.P16, 0)
}
function 前の距離を測る () {
    pins.servoWritePin(AnalogPin.P2, 90)
    basic.pause(500)
    前の距離 = 0
    while (前の距離 == 0) {
        前の距離 = sonar.ping(
        DigitalPin.P0,
        DigitalPin.P1,
        PingUnit.Centimeters
        )
    }
    led.plotBarGraph(
    前の距離,
    300,
    true
    )
    return 前の距離
}
let 前の距離 = 0
let 右の距離 = 0
let 左の距離 = 0
let バランス = 0
let スピード = 0
let 電源 = 0
電源 = 0
スピード = 500
バランス = 0
pins.servoWritePin(AnalogPin.P2, 0)
basic.pause(1000)
pins.servoWritePin(AnalogPin.P2, 180)
basic.pause(1000)
pins.servoWritePin(AnalogPin.P2, 90)
停止()
basic.forever(function () {
    while (電源 == 1) {
        前の距離を測る()
        if (前の距離 > 100) {
            右の距離を測る()
            左の距離を測る()
            pins.servoWritePin(AnalogPin.P2, 90)
            if (右の距離 > 左の距離 && 前の距離 > 左の距離) {
                左回転()
                basic.pause(500)
            } else if (右の距離 < 左の距離 && 前の距離 > 右の距離) {
                右回転()
                basic.pause(500)
            }
        } else if (前の距離 > 25) {
            前進()
        } else if (前の距離 < 15) {
            バック()
        } else {
            停止()
        }
        basic.pause(500)
    }
    停止()
})
