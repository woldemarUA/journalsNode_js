<?php

namespace App\Form;

use App\Entity\Article;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class Article1Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('author', TextType::class, [
                'attr' => ['class' => 'form-control'],
            ])
            ->add('title')
            ->add('description')
            ->add('image')
            // ->add('isApproved')
            // ->add('createdAt')
            // ->add('updatedAt')
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
