<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\Event;
use App\Entity\User;

#[ORM\Entity(repositoryClass: "App\Repository\EventRequestRepository")]
#[ORM\Table(name: "event_requests")]
class EventRequest
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column(type: "integer")]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Event::class)]
    #[ORM\JoinColumn(nullable: false)]
    private Event $event;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private User $artist;

    #[ORM\Column(type: "string", length: 20)]
    private string $status = 'pending'; // Valores: pending, accepted, rejected

    #[ORM\Column(type: "datetime")]
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
