<?php

use App\Kernel;
use Symfony\Component\ErrorHandler\Debug;
use Symfony\Component\HttpFoundation\Request;

require dirname(__DIR__).'/vendor/autoload.php';

// Ative o debug se a variável de ambiente APP_DEBUG estiver definida como true
if ($_SERVER['APP_DEBUG'] ?? false) {
    umask(0000);
    Debug::enable();
}

// Inicializa o kernel do Symfony com o ambiente e debug (padrão para 'dev' e true)
$env = $_SERVER['APP_ENV'] ?? 'dev';
$debug = (bool) ($_SERVER['APP_DEBUG'] ?? ('dev' === $env));

$kernel = new Kernel($env, $debug);
$request = Request::createFromGlobals();

// Processa a requisição e gera a resposta
$response = $kernel->handle($request);
$response->send();

// Termina o kernel após enviar a resposta
$kernel->terminate($request, $response);
