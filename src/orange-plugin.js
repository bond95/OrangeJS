export default class OrangePlugin {

  controllerHandler () {}

  connectControllers(controllers) {
    for (let i in controllers) {
      for (let j in controllers[i]) {
        this.controllerHandler(controllers[i][j]);
      }
    }
  }
}

window.OrangePlugin = OrangePlugin;