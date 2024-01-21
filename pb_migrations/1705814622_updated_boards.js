/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1z4hjfg14hxu9gs")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1z4hjfg14hxu9gs")

  collection.listRule = "@collection.projects.board ?= id && @collection.projects.members ?= @request.auth.id"
  collection.viewRule = "@collection.projects.board ?= id && @collection.projects.members ?= @request.auth.id"
  collection.createRule = "@collection.projects.board ?= id && @collection.projects.members ?= @request.auth.id"
  collection.updateRule = "@collection.projects.board ?= id && @collection.projects.members ?= @request.auth.id"
  collection.deleteRule = "@collection.projects.board ?= id && @collection.projects.members ?= @request.auth.id"

  return dao.saveCollection(collection)
})
