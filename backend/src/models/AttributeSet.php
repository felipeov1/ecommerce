<?php
// /src/models/AttributeSet.php

namespace App\Models;

class AttributeSet {
    public $id;
    public $product_id;
    public $attribute_id;
    public $value;

    public function __construct($id, $product_id, $attribute_id, $value) {
        $this->id = $id;
        $this->product_id = $product_id;
        $this->attribute_id = $attribute_id;
        $this->value = $value;
    }
}
