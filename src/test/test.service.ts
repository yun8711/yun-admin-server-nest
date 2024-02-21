import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestEntity } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestEntity)
    private readonly testRepository: Repository<TestEntity>
  ) {}

  async create(createTestDto: CreateTestDto) {
    try {
      const res = await this.testRepository.save(createTestDto);
      if (res) return;
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  findAll() {
    return `This action returns all test`;
  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
