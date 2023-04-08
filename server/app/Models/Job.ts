import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public phoneNumber: string

  @column()
  public email: string

  @column()
  public address: string

  @column()
  public postcode: string

  @column()
  public state: string

  @column()
  public clothing_type: string

  @column()
  public image: string

  @column()
  public description: string

  @column()
  public budget: string

  @column()
  public status: 'pending' | 'accepted' | 'rejected' 


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
