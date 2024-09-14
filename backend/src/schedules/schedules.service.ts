import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
  ) {}

  findAll(): Promise<Schedule[]> {
    return this.schedulesRepository.find();
  }

  findOne(id: number): Promise<Schedule> {
    return this.schedulesRepository.findOneBy({ id });
  }

  create(schedule: Schedule): Promise<Schedule> {
    return this.schedulesRepository.save(schedule);
  }

  async update(id: number, schedule: Schedule): Promise<Schedule> {
    await this.schedulesRepository.update(id, schedule);
    return this.schedulesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.schedulesRepository.delete(id);
  }
}
