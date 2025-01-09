
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  
  private logger = new Logger('Prisma client');

  async onModuleInit() {
    try {

      this.logger.log('Connecting a mongo atlas data base...');
      await this.$connect();
      
    } catch (error) {
      console.log(error);      
    }
  }
}
