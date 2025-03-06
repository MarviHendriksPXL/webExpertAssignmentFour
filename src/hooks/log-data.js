export const logData = async (context, next) => {
  console.log(`Running hook logData on ${context.path}.${context.method}`)
  console.log("before next")
  console.debug(context.data)
  console.debug(context.params.query)
  console.debug(context.result)  
  console.debug(context.dispatch) 
  await next()

  console.log("aftex next")
  console.debug(context.data)
  console.debug(context.params.query)
  console.debug(context.result)
  console.debug(context.dispatch)   
}


