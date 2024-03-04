<?php

namespace App\Controller;

use App\Entity\Article;
use App\Form\Article2Type;
use App\Repository\ArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

#[Route('/')]
class ArticleController extends AbstractController
{
    #[Route('/', name: 'app_article_index', methods: ['GET'])]
    public function index(ArticleRepository $articleRepository): Response
    {
        return $this->render('article/index.html.twig', [
            'articles' => $articleRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_article_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $article = new Article();
        $form = $this->createForm(Article2Type::class, $article);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $file = $form->get('image')->getData();
            if ($file) {
                $imagePath = $this->uploadFileApi($file);
                if ($imagePath) {
                    $article->setImage($imagePath);
                }
            }

            $entityManager->persist($article);
            $entityManager->flush();

            return $this->redirectToRoute('app_article_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('article/new.html.twig', [
            'article' => $article,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_article_show', methods: ['GET'])]
    public function show(Article $article): Response
    {
        return $this->render('article/show.html.twig', [
            'article' => $article,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_article_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Article $article, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(Article2Type::class, $article);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $file = $form->get('image')->getData();
            if ($file) {
                $imagePath = $this->uploadFileApi($file);
                if ($imagePath) {
                    $article->setImage($imagePath);
                }
            }
            $entityManager->flush();

            return $this->redirectToRoute('app_article_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('article/edit.html.twig', [
            'article' => $article,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_article_delete', methods: ['POST'])]
    public function delete(Request $request, Article $article, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete' . $article->getId(), $request->request->get('_token'))) {
            $this->deleteFileApi($article->getImage());
            $entityManager->remove($article);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_article_index', [], Response::HTTP_SEE_OTHER);
    }


    public function deleteFileApi($filePath)
    {
        $client = new Client();
        try {
            // /deleteImage
            $response = $client->request('POST', 'http://api:3001/api/articles/deleteImage', [
                \GuzzleHttp\RequestOptions::JSON => ['filePath' => $filePath]
            ]);
            $responseData = json_decode($response->getBody()->getContents(), true);

            return $responseData;
        } catch (GuzzleException $e) {
            return $e;
        }
    }

    public function uploadFileApi($file)
    {
        $client = new Client();

        try {

            $response = $client->request('POST', 'http://api:3001/api/articles/upload', [
                'multipart' => [
                    [
                        'name'     => 'article-image',
                        'contents' => fopen($file->getRealPath(), 'r'),
                        'filename' => $file->getClientOriginalName(),
                    ],
                ],
            ]);

            $body = $response->getBody();
            $data = json_decode($body, true);


            return $data['image'];
        } catch (GuzzleException $e) {
            return $e;
        }
    }
}
