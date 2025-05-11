import {
  ArrayMinSize,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ProductDto {
  @IsString({
    message: 'Название обязательно',
  })
  @IsEmpty({
    message: 'Название не должно быть пустым',
  })
  title: string;

  @IsString({
    message: 'Описание обязательно',
  })
  @IsEmpty({
    message: 'Описание не должно быть пустым',
  })
  description: string;

  @IsNumber({}, { message: 'Цена должна быть числом' })
  @IsEmpty({
    message: 'Цена не должна быть пустой',
  })
  price: number;

  @IsString({
    message: 'Укажите хотя бы одно изображение',
    each: true,
  })
  @ArrayMinSize(1, { message: 'Укажите хотя бы одно изображение' })
  @IsEmpty({
    message: 'Путь к изображению не должен быть пустым',
    each: true,
  })
  images: string[];

  @IsString({
    message: 'Категория обязательно',
    each: true,
  })
  @IsNotEmpty({
    message: 'ID категории не может быть пустым',
    each: true,
  })
  categoryId: string;
  @IsString({
    message: 'Цвет обязательно',
    each: true,
  })
  @IsNotEmpty({
    message: 'ID цвета не может быть пустым',
    each: true,
  })
  colorId: string;
}
