<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: "users")]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['user:list', 'user:item'])]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Assert\NotBlank(message: 'Email é obrigatório.')]
    #[Assert\Email(message: 'Email inválido.')]
    #[Groups(['user:list', 'user:item', 'user:write'])]
    private string $email;

    #[ORM\Column(type: 'json')]
    #[Assert\NotNull(message: 'Roles não podem ser nulas.')]
    private array $roles = [];

    #[ORM\Column(type: 'string')]
    #[Assert\NotBlank(message: 'Senha é obrigatória.')]
    #[Assert\Length(min: 6, minMessage: 'A senha deve ter pelo menos {{ limit }} caracteres.')]
    #[Groups(['user:write'])]
    private string $password;

    #[ORM\Column(type: 'string', length: 100, nullable: true)]
    #[Assert\Length(max: 100, maxMessage: 'Nome deve ter no máximo {{ limit }} caracteres.')]
    #[Groups(['user:list', 'user:item', 'user:write'])]
    private ?string $name = null;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(['user:item', 'user:write'])]
    private ?string $bio = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $photo = null;

    #[ORM\Column(type: 'json', nullable: true)]
    #[Groups(['user:item', 'user:write'])]
    private ?array $socialLinks = null;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['user:list', 'user:item'])]
    private \DateTimeInterface $createdAt;

    public function __construct()
    {
        // Define a data de criação como agora (imutável)
        $this->createdAt = new \DateTimeImmutable();
    }

    // --------------------
    // Getters e Setters
    // --------------------

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
     * Retorna roles do usuário, garantindo ROLE_USER sempre presente.
     */
    public function getRoles(): array
    {
        $roles = $this->roles;

        if (!in_array('ROLE_USER', $roles)) {
            $roles[] = 'ROLE_USER';
        }

        return array_unique($roles);
    }

    /**
     * Define roles do usuário, garantindo ROLE_USER.
     */
    public function setRoles(array $roles): self
    {
        if (!in_array('ROLE_USER', $roles)) {
            $roles[] = 'ROLE_USER';
        }
        $this->roles = array_unique($roles);
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

    // --------------------
    // Métodos da interface UserInterface
    // --------------------

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function eraseCredentials(): void
    {
        // Limpa dados sensíveis temporários, se existirem
    }

    // --------------------
    // Método mágico para facilitar debug e logs
    // --------------------
    public function __toString(): string
    {
        return $this->getEmail();
    }
}
