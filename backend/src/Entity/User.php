<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: "App\Repository\UserRepository")]
#[ORM\Table(name: "users")]
#[ApiResource(
    normalizationContext: ['groups' => ['user:list', 'user:item']],
    denormalizationContext: ['groups' => ['user:write']],
    operations: [
        new GetCollection(), // GET /users
        new Get(),           // GET /users/{id}
        new Post(),          // POST /users
        new Put(),           // PUT /users/{id}
        new Delete()         // DELETE /users/{id}
    ]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    #[Groups(['user:list', 'user:item'])]
    private ?int $id = null;

    #[ORM\Column(type: "string", length: 180, unique: true)]
    #[Groups(['user:list', 'user:item', 'user:write'])]
    private string $email;

    #[ORM\Column(type: "json")]
    private array $roles = [];

    #[ORM\Column(type: "string")]
    #[Groups(['user:write'])]
    private string $password;

    #[ORM\Column(type: "string", length: 100, nullable: true)]
    #[Groups(['user:list', 'user:item', 'user:write'])]
    private ?string $name = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['user:item', 'user:write'])]
    private ?string $bio = null;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    #[Groups(['user:item', 'user:write'])]
    private ?string $photo = null;

    #[ORM\Column(type: "json", nullable: true)]
    #[Groups(['user:item', 'user:write'])]
    private ?array $socialLinks = null;

    #[ORM\Column(type: "datetime")]
    #[Groups(['user:list', 'user:item'])]
    private \DateTimeInterface $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    /**
     * A visual identifier that represents this user.
     */
    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return $this->email;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;

        if (!in_array('ROLE_USER', $roles)) {
            $roles[] = 'ROLE_USER';
        }
        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
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

    public function getSalt(): ?string
    {
        // Not needed when using modern algorithms (bcrypt, sodium, etc.)
        return null;
    }

    public function eraseCredentials(): void
    {
        // Clear any temporary sensitive data here
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getBio(): ?string
    {
        return $this->bio;
    }

    public function setBio(?string $bio): self
    {
        $this->bio = $bio;
        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(?string $photo): self
    {
        $this->photo = $photo;
        return $this;
    }

    public function getSocialLinks(): ?array
    {
        return $this->socialLinks;
    }

    public function setSocialLinks(?array $socialLinks): self
    {
        $this->socialLinks = $socialLinks;
        return $this;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }
}
