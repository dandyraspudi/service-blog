import { Injectable, HttpException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {}

  async create(
    createBlogDto: CreateBlogDto,
  ): Promise<BlogEntity> {
    const blogData =
      await this.blogRepository.create(
        createBlogDto,
      );
    return this.blogRepository.save(blogData);
  }

  async findAll(): Promise<any> {
    try {
      return {
        status: 200,
        data: await this.blogRepository.find(),
        message: 'success'
      };
    } catch(err) {
      console.log(err, "error")
    }
  }

  async findOne(id: number) {
    const blogData =
      await this.blogRepository.findOneBy({ id });
    if (!blogData) {
      throw new HttpException(
        'User Not Found',
        404,
      );
    }
    return blogData;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const existingBlog = await this.findOne(id);
    const userData = this.blogRepository.merge(
      existingBlog,
      updateBlogDto,
    );
    return await this.blogRepository.save(
      userData,
    );
  }

  async remove(id: number): Promise<BlogEntity> {
    const existingBlog = await this.findOne(id);
    return await this.blogRepository.remove(
      existingBlog,
    );
  }
}
