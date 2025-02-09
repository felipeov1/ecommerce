<?php
// /src/models/Product.php

namespace App\Models;

class Product {
    public $id;
    public $name;
    public $description;
    public $category_id;
    public $brand;
    public $inStock;
    public $gallery;
    public $prices;

    public function __construct($id, $name, $description, $category_id, $brand, $inStock, $gallery, $prices) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->category_id = $category_id;
        $this->brand = $brand;
        $this->inStock = $inStock;
        $this->gallery = $gallery;
        $this->prices = $prices;
    }
}
