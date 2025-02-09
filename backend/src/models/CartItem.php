<?php

namespace App\Models;

class CartItem
{
    public $id;
    public $productId;
    public $quantity;
    public $product;

    public function __construct($id, $productId, $quantity, $product)
    {
        $this->id = $id;
        $this->productId = $productId;
        $this->quantity = $quantity;
        $this->product = $product;
    }
}
