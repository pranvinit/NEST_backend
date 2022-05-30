import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  async create(reportDto: CreateReportDto, user: User) {
    const report = await this.repo.create(reportDto);

    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id, approved) {
    const report = await this.repo.findOne(id);

    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;
    return this.repo.save(report);
  }

  async createEstimate({
    make,
    model,
    lng,
    lat,
    mileage,
    year,
  }: GetEstimateDto) {
    return (
      this.repo
        .createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('make = :make', { make })
        .andWhere('model = :model', { model })
        .andWhere('ABS(lng - :lng) <= 5', { lng })
        .andWhere('ABS(lat - :lat) <= 5', { lat })
        .andWhere('ABS(year - :year) <= 3', { year })
        .andWhere('approved IS TRUE')
        // special syntax for orderBy
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({ mileage })
        .limit(3)
        .getRawOne()
    );
  }

  async find() {
    return await this.repo.find();
  }

  async approvedReports() {
    const reports = await this.repo.find({ approved: true });
    return reports;
  }
}
