<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class TestController extends AbstractController
{
    /**
     * @Route("/test-base-url", name="test_base_url")
     */
    #[Route('/test', name: 'app_test')]
    public function testBaseUrl(): Response
    {
        $baseUrl = $_ENV['APP_BASE_URL'] ?? 'Not set';

        return new Response('Base URL: ' . $baseUrl);
    }
}
