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

#[ORM\Entity(repositoryClass: "App\Repository\ReviewRepository")]
#[ORM\Table(name: "reviews")]
#[ApiResource(
    normalizationContext: ['groups' => ['review:list', 'review:item']],
    denormalizationContext: ['groups' => ['review:write']],
    operations: [
        new GetCollection(), // GET /reviews
        new Get(),           // GET /reviews/{id}
        new Post(),          // POST /reviews
        new Put(),           // PUT /reviews/{id}
        new Delete()         // DELETE /reviews/{id}
    ]
)]
class Review
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type:"integer")]
    #[Groups(['review:list', 'review:item'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['review:list', 'review:item', 'review:write'])]
    private User $fan;

    #[ORM\ManyToOne(targetEntity: Event::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['review:list', 'review:item', 'review:write'])]
    private Event $event;

    #[ORM\Column(type:"integer")]
    #[Groups(['review:list', 'review:item', 'review:write'])]
    private int $rating;

    #[ORM\Column(type:"text", nullable:true)]
    #[Groups(['review:item', 'review:write'])]
    private ?string $comment = null;

    #[ORM\Column(type:"datetime")]
    #[Groups(['review:list', 'review:item'])]
    private \DateTimeInterface $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFan(): User
    {
        return $this->fan;
    }

    public function setFan(User $fan): self
    {
        $this->fan = $fan;
        return $this;
    }

    public function getEvent(): Event
    {
        return $this->event;
    }

    public function setEvent(Event $event): self
    {
        $this->event = $event;
        return $this;
    }

    public function getRating(): int
    {
        return $this->rating;
    }

    public function setRating(int $rating): self
    {
        if ($rating < 1 || $rating > 5) {
            throw new \InvalidArgumentException("Rating must be between 1 and 5");
        }
        $this->rating = $rating;
        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;
        return $this;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }
}
