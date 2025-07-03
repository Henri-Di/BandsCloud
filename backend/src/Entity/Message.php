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
use App\Repository\MessageRepository;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
#[ORM\Table(name: "messages")]
#[ApiResource(
    normalizationContext: ['groups' => ['message:list', 'message:item']],
    denormalizationContext: ['groups' => ['message:write']],
    operations: [
        new GetCollection(), // GET /messages
        new Get(),           // GET /messages/{id}
        new Post(),          // POST /messages
        new Put(),           // PUT /messages/{id}
        new Delete(),        // DELETE /messages/{id}
    ],
    order: ['sentAt' => 'DESC'],
)]
class Message
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column(type: "integer")]
    #[Groups(['message:list', 'message:item'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['message:list', 'message:item', 'message:write'])]
    private User $sender;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['message:list', 'message:item', 'message:write'])]
    private User $recipient;

    #[ORM\Column(type: "text")]
    #[Groups(['message:list', 'message:item', 'message:write'])]
    private string $content;

    #[ORM\Column(type: "datetime")]
    #[Groups(['message:list', 'message:item'])]
    private \DateTimeInterface $sentAt;

    public function __construct()
    {
        $this->sentAt = new \DateTimeImmutable();
    }

    public function getId(): ?int 
    { 
        return $this->id; 
    }

    public function getSender(): User 
    { 
        return $this->sender; 
    }

    public function setSender(User $sender): self 
    { 
        $this->sender = $sender; 
        return $this; 
    }

    public function getRecipient(): User 
    { 
        return $this->recipient; 
    }

    public function setRecipient(User $recipient): self 
    { 
        $this->recipient = $recipient; 
        return $this; 
    }

    public function getContent(): string 
    { 
        return $this->content; 
    }

    public function setContent(string $content): self 
    { 
        $this->content = $content; 
        return $this; 
    }

    public function getSentAt(): \DateTimeInterface 
    { 
        return $this->sentAt; 
    }
}
