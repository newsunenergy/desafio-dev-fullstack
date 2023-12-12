import { Observable } from 'rxjs'
import { Repository } from '../base/repository'
import { UserEntity } from '../domain/entities/user.entity'

export abstract class UserRepository extends Repository<UserEntity> {
  abstract patch(id: string, data: Partial<UserEntity>): Observable<UserEntity>
}
