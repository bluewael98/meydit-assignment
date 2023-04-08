import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Consumer from 'App/Models/Consumer'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ConsumersController {
  public async index ({}: HttpContextContract) {
    const consumers = await Consumer.all()
    return consumers
  }

  
  public async store ({request}: HttpContextContract) {
    const consumerSchema = schema.create({
      firstName: schema.string(),
      lastName: schema.string(),
      phoneNumber: schema.string(),
      email: schema.string(),
      address: schema.string(),
      postcode: schema.string(),
      state: schema.string(),
    })

    const data = await request.validate({schema: consumerSchema})
    const consumer = new Consumer()
    consumer.fill(data)
    await consumer.save()

    return consumer
  }

  public async show ({params}: HttpContextContract){
    const consumer = await Consumer.findByOrFail('id', params.id)
    return consumer
  }

  public async update({params, request}: HttpContextContract) {
    const consumer = await Consumer.findOrFail(params.id)
    const data = request.only(['firstName', 'lastName', 'phoneNumber', 'email', 'address', 'postcode', 'state'])
    consumer.merge(data)
    await consumer.save()
    return consumer
  }

  public async destroy({params, response}: HttpContextContract){
  const consumer = await Consumer.findOrFail(params.id)
  await consumer.delete()
  return response.json({message: 'Consumer deleted successfully'})
  }

}
