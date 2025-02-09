<?php 

namespace App\Controllers;


class OrderController
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function placeOrder(array $orderItems, float $total): bool {
        try {

            $this->pdo->beginTransaction();
    

            $stmt = $this->pdo->prepare("
                INSERT INTO orders (total_amount, created_at)
                VALUES (:total, NOW())
            ");
            $stmt->execute(['total' => $total]);
            $orderId = $this->pdo->lastInsertId();
    

            foreach ($orderItems as $item) {
                $stmt = $this->pdo->prepare("
                    INSERT INTO order_items (order_id, product_id, quantity)
                    VALUES (:orderId, :productId, :quantity)
                ");
                $stmt->execute([
                    'orderId' => $orderId,
                    'productId' => $item['productId'],
                    'quantity' => $item['quantity'],
                ]);
                $orderItemId = $this->pdo->lastInsertId();
    

                foreach ($item['attributes'] as $attribute) {
                    $stmt = $this->pdo->prepare("
                        INSERT INTO order_item_attributes (order_item_id, attribute_name, attribute_value)
                        VALUES (:orderItemId, :name, :value)
                    ");
                    $stmt->execute([
                        'orderItemId' => $orderItemId,
                        'name' => $attribute['name'],
                        'value' => $attribute['value'],
                    ]);
                }
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