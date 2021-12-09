export class CreateProductDTO {
  readonly product_id: string;
  readonly product_name: string;
  readonly product_desc: string;
  readonly product_cost: number;
  readonly product_availability: boolean;
  readonly user_id: string;
}
