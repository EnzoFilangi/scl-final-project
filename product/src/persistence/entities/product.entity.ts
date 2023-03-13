import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

class DecimalColumnTransformer {
    to(data: number): number {
        return data;
    }
    from(data: string): number {
        return parseFloat(data);
    }
}

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column("decimal", { precision: 20, scale: 2,
        transformer: new DecimalColumnTransformer() })
    price: number;
    
    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}