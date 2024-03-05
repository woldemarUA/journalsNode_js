<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

// Déclaration de l'entité User et du repository associé
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity(fields: ['nom'], message: 'There is already an account with this nom')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    // Déclaration des propriétés de l'entité User
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null; // Identifiant unique de l'utilisateur

    #[ORM\Column(length: 180, unique: true)]
    private ?string $nom = null; // Nom de l'utilisateur, unique

    // Champ 'role' de l'ancienne entité User1, pour la compatibilité arrière
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $role = 'Basic'; // Rôle de l'utilisateur (pour compatibilité)

    #[ORM\Column(length: 255)]
    private ?string $email = null; // Adresse email de l'utilisateur

    // Liste des rôles de l'utilisateur
    #[ORM\Column]
    private array $roles = []; // Rôles de l'utilisateur sous forme de tableau

    #[ORM\Column]
    private ?string $password = null; // Mot de passe hashé de l'utilisateur

    // Collection d'articles associés à l'utilisateur
    #[ORM\OneToMany(targetEntity: Article::class, mappedBy: 'userId')]
    private Collection $articles; // Articles écrits par l'utilisateur

    // Constructeur de l'entité User
    public function __construct()
    {
        $this->articles = new ArrayCollection();
        $this->roles = [];
    }

    // Getters et setters des propriétés
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;
        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(?string $role): self
    {
        $this->role = $role;
        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    public function getUserIdentifier(): string
    {
        return (string) $this->nom;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        // Garantir que chaque utilisateur a au moins le rôle ROLE_USER
        $roles[] = 'ROLE_USER';
        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        return $this;
    }

    public function eraseCredentials(): void
    {
        // Si des données temporaires sensibles sont stockées sur l'utilisateur, les effacer ici
        // $this->plainPassword = null;
    }

    // Gestion de la collection d'articles de l'utilisateur
    /**
     * @return Collection<int, Article>
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles->add($article);
            $article->setUserId($this);
        }
        return $this;
    }

    public function removeArticle(Article $article): self
    {
        if ($this->articles->removeElement($article)) {
            // Définir le côté propriétaire sur null (sauf si déjà changé)
            if ($article->getUserId() === $this) {
                $article->setUserId(null);
            }
        }
        return $this;
    }
}
