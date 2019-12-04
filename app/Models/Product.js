'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

    file () {
      return this.belongsTo('App/Models/File')
    }
}
//entrei

module.exports = Product