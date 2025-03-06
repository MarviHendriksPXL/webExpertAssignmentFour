import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const messageSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String(), 
    userId: Type.String({ objectid: true }),
    email: Type.String()
  },
  { $id: 'Message', additionalProperties: false }
)
export const messageValidator = getValidator(messageSchema, dataValidator)
export const messageResolver = resolve({
  email: virtual(async (object, context) => {
    let user = await context.app.service('users').get(object.userId)
    return user.email
  }) 
})

export const messageExternalResolver = resolve({
  userId: async () => undefined
})

export const messageDataSchema = Type.Pick(messageSchema, ['text'], {
  $id: 'MessageData'
})
export const messageDataValidator = getValidator(messageDataSchema, dataValidator)
export const messageDataResolver = resolve({
  userId: async (value, object, context) => {
    return context.params.user._id
  }
})

export const messagePatchSchema = Type.Pick(messageSchema, ['text'], {
  $id: 'MessagePatch'
})
export const messagePatchValidator = getValidator(messagePatchSchema, dataValidator)
export const messagePatchResolver = resolve({
  userId: async (value, object, context) => {
    return context.params.user._id
  }
})

// Schema for allowed query properties
export const messageQueryProperties = Type.Pick(messageSchema, ['_id', 'text','userId'])
export const messageQuerySchema = Type.Intersect(
  [
    querySyntax(messageQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const messageQueryValidator = getValidator(messageQuerySchema, queryValidator)
export const messageQueryResolver = resolve({})
/*export const messageQueryResolver = resolve({
  userId: async (value, object, context) => {
    return context.params.user._id
  }
})*/

