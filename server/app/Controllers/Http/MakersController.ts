import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Maker from 'App/Models/Maker'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class MakersController {
  public async index({response}: HttpContextContract) {
    const makers = await Maker.all()
    return response.json(makers)
  }
  public async show({params, response}: HttpContextContract) {
    const maker = await Maker.findByOrFail('id', params.id)
    return response.json(maker)
  }

  public async store({request, response}: HttpContextContract) {
    const makerSchema = schema.create({
      name: schema.string(),
      email: schema.string(),
      phone_number: schema.string(),
      price: schema.string(),
      comments: schema.string(),
    })

    const data = await request.validate({schema: makerSchema})
    const maker = new Maker()
    maker.fill(data)
    await maker.save()

    return response.json(maker)
  }

  public async update({params, request}: HttpContextContract) {
    const maker = await Maker.findByOrFail('id', params.id)
    const data = request.only(['name', 'email', 'phone_number', 'price', 'comments' ])
    maker.merge(data)
    await maker.save()
    return maker
  }

  public async destroy({params, response}: HttpContextContract) {
    const maker = await Maker.findByOrFail('id', params.id)
    await maker.delete()
    return response.json({message: 'Maker deleted successfully'})
  }
}
