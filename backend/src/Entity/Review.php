<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: "App\Repository\ReviewRepository")]
#[ORM\Table(name: "reviews")]
class Review
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type:"integer")]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private User $fan;

    #[ORM\ManyToOne(targetEntity: Event::class)]
    #[ORM\JoinColumn(nullable: false)]
    private Event $event;

    #[ORM\Column(type:"integer")]
    private int $rating;

    #[ORM\Column(type:"text", nullable:true)]
    private ?string $comment = null;

    #[ORM\Column(type:"datetime")]
    private \DateTimeInterface $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters and setters

    public function getId(): ?int { return $this->id; }
    public function getFan(): User { return $this->fan; }
    public function setFan(User $fan): self { $this->fan = $fan; return $this; }

    public function getEvent(): Event { return $this->event; }
    public function setEvent(Event $event): self { $this->event = $event; return $this; }

    public function getRating(): int { return $this->rating; }
    public function setRating(int $rating): self
    {
        if ($rating < 1 || $rating > 5) {
            throw new \InvalidArgumentException("Rating must be between 1 and 5");
        }
        $this->rating = $rating;
        return $this;
    }

    public function getComment(): ?string { return $this->comment; }
    public function setComment(?string $comment): self { $this->comment = $comment; return $this; }

    public function getCreatedAt(): \DateTimeInterface { return $this->createdAt; }
}
