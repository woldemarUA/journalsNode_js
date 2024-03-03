<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpClient\HttpClient;

class ArticlesController extends AbstractController
{


    #[Route('/articles', name: 'app_articles')]
    public function index(): Response
    {
        $httpClient = HttpClient::create();
        $getArticlesApi = 'http://brigitte.bwb/api/articles/';
        try {
            $response = $httpClient->request('GET', $getArticlesApi);
            $articles = $response->toArray();
        } catch (\Throwable $e) {
            // Log or handle the error
            dump($e->getMessage());
            $articles = [];
        }
        // $response = $httpClient->request('GET', $getArticlesApi);

        // // $responseData = $response->toArray();
        // $articles  = $response->toArray();

        return $this->render('articles/index.html.twig', [
            'controller_name' => 'ArticlesController',
            'articles' => $articles
        ]);
    }
}
