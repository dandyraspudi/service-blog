import {
    IsNotEmpty,
    IsString
} from 'class-validator';
  
// create-user-dto
export class CreateBlogDto {
    @IsNotEmpty()
    @IsString()
    content: string;
  
    @IsNotEmpty()
    @IsString()
    author: string;
}
