serial.onDataReceived(serial.delimiters(Delimiters.CarriageReturn), function () {
    id = parseFloat(serial.readString())
    serial.writeLine(convertToText(id))
    flashstorage.put("id", convertToText(id))
    control.reset()
})
let id = 0
serial.setBaudRate(BaudRate.BaudRate9600)
id = parseFloat(flashstorage.get("id"))
controller.initController(id)
led.setBrightness(32)
basic.showNumber(id)
basic.pause(1000)
basic.clearScreen()
basic.forever(function () {
    basic.clearScreen()
    led.plot(0, 4 - Math.round(joystickbit.getRockerValue(joystickbit.rockerType.Y) / 256))
    led.unplot(0, 2)
    led.plot(4 - Math.round(joystickbit.getRockerValue(joystickbit.rockerType.X) / 256), 4)
    led.unplot(2, 4)
    if (joystickbit.getButton(joystickbit.JoystickBitPin.P12)) {
        led.plot(2, 2)
    }
    if (joystickbit.getButton(joystickbit.JoystickBitPin.P13)) {
        led.plot(3, 1)
    }
    if (joystickbit.getButton(joystickbit.JoystickBitPin.P14)) {
        led.plot(3, 3)
    }
    if (joystickbit.getButton(joystickbit.JoystickBitPin.P15)) {
        led.plot(4, 2)
    }
    if (input.buttonIsPressed(Button.A)) {
        led.plot(2, 0)
    }
    if (input.buttonIsPressed(Button.B)) {
        led.plot(4, 0)
    }
    if (input.logoIsPressed()) {
        led.plot(3, 0)
    }
})
basic.forever(function () {
    serial.writeLine("Set ID (" + id + "):")
    basic.pause(1000)
})
