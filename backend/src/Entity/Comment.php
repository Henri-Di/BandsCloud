<?php
namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

use App\Entity\User;
use App\Entity\Event;

#[ORM\Entity(repositoryClass: "App\Repository\CommentRepository")]
#[ORM\Table(name: "comments")]
#[ApiResource(
    normalizationContext: ['groups' => ['comment:list', 'comment:item']],
    denormalizationContext: ['groups' => ['comment:write']],
    operations: [
        new GetCollection(), // GET /comments
        new Get(),           // GET /comments/{id}
        new Post(),          // POST /comments
        new Put(),           // PUT /comments/{id}
        new Delete(),        // DELETE /comments/{id}
    ],
    order: ['createdAt' => 'DESC'],
)]
class Comment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type:"integer")]
    #[Groups(['comment:list', 'comment:item'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['comment:list', 'comment:item', 'comment:write'])]
    private User $user;

    #[ORM\ManyToOne(targetEntity: Event::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['comment:list', 'comment:item', 'comment:write'])]
    private Event $event;

    #[ORM\Column(type:"text")]
    #[Groups(['comment:list', 'comment:item', 'comment:write'])]
    private string $content;

    #[ORM\Column(type:"datetime")]
    #[Groups(['comment:list', 'comment:item'])]
    private \DateTimeInterface $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters and setters

    public function getId(): ?int { return $this->id; }
    public function getUser(): User { return $this->user; }
    public function setUser(User $user): self { $this->user = $user; return $this; }

    public function getEvent(): Event { return $this->event; }
    public function setEvent(Event $event): self { $this->event = $event; return $this; }

    public function getContent(): string { return $this->content; }
    public function setContent(string $content): self { $this->content = $content; return $this; }

    public function getCreatedAt(): \DateTimeInterface { return $this->createdAt; }
}
