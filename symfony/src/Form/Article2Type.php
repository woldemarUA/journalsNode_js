<?php

namespace App\Form;

use App\Entity\Article;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\FileType;

class Article2Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('author', TextType::class, [
                'attr' => ['class' => 'form-control'],
            ])
            ->add('title', TextType::class, [
                'attr' => ['class' => 'form-control'],
            ])
            ->add('description', TextareaType::class, [
                // Optional configuration
                'attr' => ['class' => 'form-control'],
                'required' => false,
                'label' => 'journal description',
            ])
            ->add('image', TextType::class, [
                'attr' => ['class' => 'form-control'],
            ])
            ->add('image', FileType::class, [
                'label' => 'Upload file',
                'mapped' => false,
                'required' => false,
                // This is not needed for HTML5 compliant browsers
                'attr' => [
                    'accept' => 'image/*',
                    'class' => 'form-control'
                ],
            ])

            ->add('userId', EntityType::class, [
                'class' => User::class,
                'choice_label' => 'id',
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Article::class,
        ]);
    }
}
