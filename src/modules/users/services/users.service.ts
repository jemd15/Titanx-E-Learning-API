import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { User } from '../entities/User';

@Injectable()
export class UsersService {

  constructor(
    private userRepository: UsersRepository
  ){}

  findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUserById(user_id: number): Promise<User> {
    return this.userRepository.findOne(user_id);
  }

  async createTeacher(user): Promise<any> {
    let newUser = await this.userRepository.save(user);
    let teacher = {
      user_user_id: newUser.userId,
      school_school_id: user.schoolId
    }
  }

  async createStudent(user: Partial<User>): Promise<User> {
    return await this.userRepository.save(user);
  }

  async createAdmin(user: Partial<User>): Promise<User> {
    return await this.userRepository.save(user);
  }

}
