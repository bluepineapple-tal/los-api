import slugify from 'slugify';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductModel } from '../product-model/product-model.entity';
import { ProductStatus } from '../products.enum';

@Entity()
export class ProductMake {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
  })
  status: ProductStatus;

  @Column({ unique: true })
  slug: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships

  @OneToMany(() => ProductModel, (model) => model.make)
  models: ProductModel[];

  // Lifecycle hook to generate/update the slug
  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.name) {
      // The options lower: true and strict: true ensure a lowercase, URL-friendly string.
      this.slug = slugify(this.name, { lower: true, strict: true });
    }
  }
}
