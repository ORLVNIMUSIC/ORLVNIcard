import { PRODUCTS } from 'src/server/products/product.entity';

export class CreateUserDTO {
  user_id: string;
  user_name: string;
  user_bio: string;
  user_password: string;
  user_email: string;
  products: PRODUCTS[];
}
