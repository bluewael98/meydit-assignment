/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from 'fs';

Route.group(() => {
  // Consumer Routes
  Route.post('/consumers', 'ConsumersController.store')
  Route.get('/consumers', 'ConsumersController.index')
  Route.get('/consumers/:id', 'ConsumersController.show')
  Route.put('/consumers/:id', 'ConsumersController.update')
  Route.delete('/consumers/:id', 'ConsumersController.destroy')

  // Maker Routes
  Route.post('/makers', 'MakersController.store')
  Route.get('/makers', 'MakersController.index')
  Route.get('/makers/:id', 'MakersController.show')
  Route.put('/makers/:id', 'MakersController.update')
  Route.delete('/makers/:id', 'MakersController.destroy')

  // Job 
  Route.post('/jobs', 'JobsController.store')
  Route.get('/jobs', 'JobsController.index')
  Route.get('/jobs/:id', 'JobsController.show')
  Route.put('/jobs/:id', 'JobsController.update')
  Route.delete('/jobs/:id', 'JobsController.destroy')
  
}).prefix('api/v1')

Route.get('/uploads/:filename', async ({ params, response }: HttpContextContract) => {
  const filePath = Application.makePath('public', 'uploads', params.filename)
  return response.download(filePath)
})