<?php

namespace App\Controllers;

use PDO;

class OrderController {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function placeOrder(array $cartItems, float $total): bool {
        try {

            $this->pdo->beginTransaction();


            $stmt = $this->pdo->prepare("
                INSERT INTO orders (total_amount, created_at)
                VALUES (:total, NOW())
            ");
            $stmt->execute(['total' => $total]);
            $orderId = $this->pdo->lastInsertId();


            foreach ($cartItems as $productId) {
                $stmt = $this->pdo->prepare("
                    INSERT INTO order_items (order_id, product_id, quantity)
                    VALUES (:orderId, :productId, 1)
                ");
                $stmt->execute(['orderId' => $orderId, 'productId' => $productId]);
            }


            $this->pdo->commit();
            return true;

        } catch (\Exception $e) {

            $this->pdo->rollBack();
            error_log("Error placing order: " . $e->getMessage());
            return false;
        }
    }
}