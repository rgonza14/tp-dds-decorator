'use client';

import { useState, useEffect } from 'react';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Commerce = () => {
    const [category, setCategory] = useState('electronics');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(
                `https://fakestoreapi.com/products/category/${category}`
            );
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, [category]);

    return (
        <div className='container mx-auto mt-4'>
            <h2 className='text-xl font-bold mb-4'>Productos participantes</h2>

            <Select
                onValueChange={value => setCategory(value)}
                defaultValue='electronics'
            >
                <SelectTrigger className='w-[200px]'>
                    <SelectValue placeholder='Selecciona una categoría' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='electronics'>Electrónica</SelectItem>
                    <SelectItem value='jewelery'>Joyería</SelectItem>
                    <SelectItem value="men's clothing">
                        Ropa para hombres
                    </SelectItem>
                    <SelectItem value="women's clothing">
                        Ropa para mujeres
                    </SelectItem>
                </SelectContent>
            </Select>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                {products.map(product => (
                    <Card key={product.id} className='p-4'>
                        <CardHeader>
                            <img
                                src={product.image}
                                alt={product.title}
                                className='h-48 object-cover mb-4'
                            />
                            <CardTitle>{product.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-sm'>
                                Puntos necesarios: {product.price.toFixed(2)}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Commerce;
