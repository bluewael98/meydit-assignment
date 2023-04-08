import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Job from 'App/Models/Job'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class JobsController {

public async index ({response}: HttpContextContract) {
  const jobs = await Job.all()
  return response.json(jobs)
}

public async store ({request, response}: HttpContextContract ) {
  const jobSchema = schema.create({
   firstName: schema.string(),
   lastName: schema.string(),
   phone_number: schema.string(),
   email: schema.string(),
   address: schema.string(),
   postcode: schema.string(),
   state: schema.string(),
   clothing_type: schema.string(),
   image: schema.string(),
   description: schema.string(),
   budget: schema.string.optional(),
})
  const data = await request.validate({schema: jobSchema})
  const job = await Job.create(data)

  return response.json(job)
  
}

public async show ({params, response}: HttpContextContract) {
 const job = await Job.findByOrFail(params.id, response)
  
  response.json(job)
}


public async update({params, request, response}: HttpContextContract) {
  const data = request.only([
    'firstName',
    'lastName',
    'phone_number',
    'email',
    'address',
    'postcode',
    'state',
    'clothing_type',
    'image',
    'description',
    'budget',
  ])

  const job = await Job.findByOrFail(params.id, response)

  job.merge(data)

  await job.save()

  response.json(job)
}

public async destroy ({ params, response }: HttpContextContract) {
  const job = await Job.findByOrFail(params.id, response)

  await job.delete()

  response.json({ message: 'Job deleted successfully'})
}

}
