<?php

namespace App\Controller;

use App\Form\FileUploadType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Symfony\Component\Routing\Attribute\Route;

class FileUploadController extends AbstractController
{
    #[Route('/file/upload', name: 'app_file_upload')]
    public function index(Request $request): Response
    {
        $form = $this->createForm(FileUploadType::class);
        $form = $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $file = $form->get('file')->getData();
            if ($file) {
                $imagePath = $this->uploadFileApi($file);
                return $this->render('index/index.html.twig', ['image' => $imagePath]);
            }
        }
        // Render the form view if not submitted/valid or on initial request
        return $this->render('file_upload/index.html.twig', [
            'form' => $form->createView(),
        ]);
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
