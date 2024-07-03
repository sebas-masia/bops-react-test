const locationMaterialCategories = require('./locationMaterialCategories')
const locationMaterials = require('./locationMaterials')
const notifications = require('./notifications')
const locations = require('./locations')
const materials = require('./materials')

module.exports = () => ({ locationMaterialCategories, locationMaterials, notifications, locations, materials });
