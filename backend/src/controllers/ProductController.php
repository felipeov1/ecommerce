<?php

namespace App\Controllers;

use PDO;

class ProductController
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAllProducts()
    {
        $stmt = $this->pdo->prepare("SELECT * FROM products");
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        foreach ($products as &$product) {


            $stmt = $this->pdo->prepare("SELECT image_url FROM gallery WHERE product_id = ?");
            $stmt->execute([$product['id']]);
            $product['gallery'] = array_column($stmt->fetchAll(PDO::FETCH_ASSOC), 'image_url');
    

            $stmt = $this->pdo->prepare("SELECT * FROM attributes WHERE product_id = ?");
            $stmt->execute([$product['id']]);
            $attributes = $stmt->fetchAll(PDO::FETCH_ASSOC);


    
            foreach ($attributes as &$attribute) {

                $attributeName = $attribute['name'];
                $stmt = $this->pdo->prepare("SELECT * FROM attribute_items WHERE product_id = ? AND attribute_name = ?");
                $stmt->execute([$attribute['product_id'], $attributeName]);
                $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                $attribute['items'] = $items; 
            
            }
    
            $product['attributes'] = $attributes;
    

            $stmt = $this->pdo->prepare("SELECT amount, currency, symbol FROM prices WHERE product_id = ?");
            $stmt->execute([$product['id']]);
            $prices = $stmt->fetchAll(PDO::FETCH_ASSOC);
    

            $product['prices'] = array_map(function ($price) {
                return [
                    'amount' => $price['amount'],
                    'currency' => [
                        'label' => $price['currency'],
                        'symbol' => $price['symbol'],  
                    ],
                ];
            }, $prices);
        }


        return $products;
    }
}
