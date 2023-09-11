const { ServiceProvider } = require('@adonisjs/fold')

class CrispProvider extends ServiceProvider {
  register () {
    this.app.singleton('Crisp', () => {
      const Config = this.app.use('Adonis/Src/Config')
      return new (require('.'))(Config)
    })
  }
}

module.exports = CrispProvider