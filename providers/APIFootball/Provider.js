const { ServiceProvider } = require('@adonisjs/fold')

class APIFootballProvider extends ServiceProvider {
  register () {
    this.app.singleton('APIFootball', () => {
      const Config = this.app.use('Adonis/Src/Config')
      return new (require('.'))(Config)
    })
  }
}

module.exports = APIFootballProvider