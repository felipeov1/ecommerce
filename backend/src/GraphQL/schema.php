<?php

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../config/database.php';

$pdo = dbConnection();


$attributeInputType = new InputObjectType([
    'name' => 'AttributeInput',
    'fields' => [
        'name' => ['type' => Type::string()],
        'value' => ['type' => Type::string()],
    ],
]);


$orderItemInputType = new InputObjectType([
    'name' => 'OrderItemInput',
    'fields' => [
        'productId' => ['type' => Type::string()],
        'quantity' => ['type' => Type::int()],
        'attributes' => ['type' => Type::listOf($attributeInputType)], 
        
    ],
]);


$currencyType = new ObjectType([
    'name' => 'Currency',
    'fields' => [
        'label' => ['type' => Type::string()], 
        'symbol' => ['type' => Type::string()], 
    ],
]);

$priceType = new ObjectType([
    'name' => 'Price',
    'fields' => [
        'amount' => ['type' => Type::float()], 
        'currency' => ['type' => $currencyType],
        
    ],
]);


$attributeItemType = new ObjectType([
    'name' => 'AttributeItem',
    'fields' => [
        'id' => ['type' => Type::string()], 
        'displayValue' => ['type' => Type::string()], 
        'value' => ['type' => Type::string()], 
    ],
]);


$attributeType = new ObjectType([
    'name' => 'Attribute',
    'fields' => [
        'product_id' => ['type' => Type::string()], 
        'name' => ['type' => Type::string()], 
        'type' => ['type' => Type::string()], 
        'items' => ['type' => Type::listOf($attributeItemType)], 
    ],
]);


$galleryType = Type::listOf(Type::string()); 

$productType = new ObjectType([
    'name' => 'Product',
    'fields' => [
        'id' => ['type' => Type::string()], 
        'name' => ['type' => Type::string()], 
        'in_stock' => ['type' => Type::int()], 
        'gallery' => ['type' => $galleryType], 
        'description' => ['type' => Type::string()], 
        'category' => ['type' => Type::string()], 
        'attributes' => ['type' => Type::listOf($attributeType)], 
        'prices' => ['type' => Type::listOf($priceType)], 
        'brand' => ['type' => Type::string()], 
    ],
]);

$categoryType = new ObjectType([
    'name' => 'Category',
    'fields' => [
        'name' => ['type' => Type::string()],
    ],
]);

$queryType = new ObjectType([
    'name' => 'Query',

    'fields' => [

        'products' => [
            'type' => Type::listOf($productType),
            'resolve' => function ($rootValue, $args, $context) {
                return $context['productController']->getAllProducts(); 
            },
        ],

        'categories' => [
            'type' => Type::listOf($categoryType),
            'resolve' => function ($rootValue, $args, $context) {
                return $context['categoryController']->getAllCategories();
            },
        ],
    ],

]);

$mutationType = new ObjectType([
    'name' => 'Mutation',
    'fields' => [
        'placeOrder' => [
            'type' => Type::boolean(),
            'args' => [
                'orderItems' => ['type' => Type::listOf($orderItemInputType)],
                'total' => ['type' => Type::float()],
            ],
            'resolve' => function ($rootValue, $args, $context) {
                return $context['orderController']->placeOrder($args['orderItems'], $args['total']);
            },
        ],
    ],
]);

$schema = new Schema([
    'query' => $queryType,
    'mutation' => $mutationType,
]);

return $schema;
