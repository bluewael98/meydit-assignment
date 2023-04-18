import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Job from 'App/Models/Job'
import { schema } from '@ioc:Adonis/Core/Validator'
import Drive from '@ioc:Adonis/Core/Drive';
import fs from 'fs'

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
   image: schema.file({
    size: '2mb',
    extnames: ['jpg', 'png', 'jpeg'],
  }),
   description: schema.string(),
   budget: schema.string.optional(),
   submissions: schema.number.optional(),
})
const payload = await request.validate({ schema: jobSchema })

// Get the uploaded image
const image = request.file('image')

if (!image || !image.tmpPath) {
  return response.badRequest('Image is required')
}

const imageName = `${Date.now()}.${image.extname}`
const imagePath = `jobs/${imageName}`

try {
  const contentType = image.headers['content-type'] || 'application/octet-stream'

  // Upload the image to the S3 bucket with the correct content type
  await Drive.use('s3').putStream(imagePath, fs.createReadStream(image.tmpPath as string), {
    contentType: contentType,
    visibility: 'public',
  })

  // Create the job with the uploaded image URL
  const imageUrl = await Drive.use('s3').getUrl(imagePath)
  const job = await Job.create({
    ...payload,
    image: imageUrl,
  })

  return response.created(job)
} catch (error) {
  console.log(error)
  return response.internalServerError('Something went wrong while uploading the image')
}
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
    'submissions',
  ])

  const job = await Job.findByOrFail('id', params.id)

  job.merge(data)

  await job.save()

  response.json(job)
}

public async destroy ({ params, response }: HttpContextContract) {
  const job = await Job.findByOrFail('id', params.id)

  await job.delete()

  response.json({ message: 'Job deleted successfully'})
}

}
