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

use App\Entity\Event;
use App\Entity\User;

#[ORM\Entity(repositoryClass: "App\Repository\EventRequestRepository")]
#[ORM\Table(name: "event_requests")]
#[ApiResource(
    normalizationContext: ['groups' => ['event_request:list', 'event_request:item']],
    denormalizationContext: ['groups' => ['event_request:write']],
    operations: [
        new GetCollection(), // GET /event_requests
        new Get(),           // GET /event_requests/{id}
        new Post(),          // POST /event_requests
        new Put(),           // PUT /event_requests/{id}
        new Delete(),        // DELETE /event_requests/{id}
    ],
    order: ['createdAt' => 'DESC'],
)]
class EventRequest
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column(type: "integer")]
    #[Groups(['event_request:list', 'event_request:item'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Event::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['event_request:list', 'event_request:item', 'event_request:write'])]
    private Event $event;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['event_request:list', 'event_request:item', 'event_request:write'])]
    private User $artist;

    #[ORM\Column(type: "string", length: 20)]
    #[Groups(['event_request:list', 'event_request:item', 'event_request:write'])]
    private string $status = 'pending'; // Valores: pending, accepted, rejected

    #[ORM\Column(type: "datetime")]
    #[Groups(['event_request:list', 'event_request:item'])]
    private \DateTimeInterface $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->status = 'pending';
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getArtist(): User
    {
        return $this->artist;
    }

    public function setArtist(User $artist): self
    {
        $this->artist = $artist;
        return $this;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;
        return $this;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }
}
