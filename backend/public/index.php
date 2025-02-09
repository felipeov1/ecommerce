<?php
require_once '../vendor/autoload.php';
require_once '../src/GraphQL/schema.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../src/controllers/ProductController.php';
require_once __DIR__ . '/../src/controllers/CategoryController.php';
require_once __DIR__ . '/../src/controllers/OrderController.php';


use GraphQL\GraphQL;
use App\Controllers\ProductController;
use App\Controllers\CategoryController;
use App\Controllers\OrderController;


header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");



if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$pdo = dbConnection();
$schema = require '../src/GraphQL/schema.php';

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

$query = $data['query'] ?? '';
$variables = $data['variables'] ?? null;


$productController = new ProductController($pdo);
$categoryController = new CategoryController($pdo);
$orderController = new OrderController($pdo);


$context = [
    'productController' => $productController,
    'categoryController' => $categoryController,
    'orderController' => $orderController
];

try {
    $result = GraphQL::executeQuery($schema, $query, null, $context, $variables);
    $output = $result->toArray();
    echo json_encode($output);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
