<?php

namespace App\Controllers;

use PDO;

class CategoryController
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }


    public function getAllCategories()
    {
    
        $stmt = $this->pdo->prepare("SELECT name FROM categories");
        $stmt->execute();
        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);


        return $categories;

    }
}
