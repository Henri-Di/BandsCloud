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

#[ORM\Entity(repositoryClass: "App\Repository\EventRepository")]
#[ORM\Table(name: "events")]
#[ApiResource(
    normalizationContext: ['groups' => ['event:list', 'event:item']],
    denormalizationContext: ['groups' => ['event:write']],
    operations: [
        new GetCollection(), // GET /events
        new Get(),           // GET /events/{id}
        new Post(),          // POST /events
        new Put(),           // PUT /events/{id}
        new Delete(),        // DELETE /events/{id}
    ],
    order: ['createdAt' => 'DESC'],
)]
class Event
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column(type:"integer")]
    #[Groups(['event:list', 'event:item', 'event_request:list', 'event_request:item'])]
    private ?int $id = null;

    #[ORM\Column(type:"string")]
    #[Groups(['event:list', 'event:item', 'event:write', 'event_request:list', 'event_request:item'])]
    private string $title;

    #[ORM\Column(type:"text", nullable:true)]
    #[Groups(['event:list', 'event:item', 'event:write', 'event_request:list', 'event_request:item'])]
    private ?string $description = null;

    #[ORM\Column(type:"datetime")]
    #[Groups(['event:list', 'event:item', 'event:write', 'event_request:list', 'event_request:item'])]
    private \DateTimeInterface $startDate;

    #[ORM\Column(type:"datetime", nullable:true)]
    #[Groups(['event:list', 'event:item', 'event:write', 'event_request:list', 'event_request:item'])]
    private ?\DateTimeInterface $endDate = null;

    #[ORM\Column(type:"datetime")]
    #[Groups(['event:list', 'event:item', 'event_request:list', 'event_request:item'])]
    private \DateTimeInterface $createdAt;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable:false)]
    #[Groups(['event:list', 'event:item', 'event:write', 'event_request:list', 'event_request:item'])]
    private User $artist;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable:false)]
    #[Groups(['event:list', 'event:item', 'event:write', 'event_request:list', 'event_request:item'])]
    private User $venue;

    public function __construct()
    {
        $this->createdAt = new \DateTime(); // Define criação automática
    }

    // Getters and setters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getStartDate(): \DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;
        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(?\DateTimeInterface $endDate): self
    {
        $this->endDate = $endDate;
        return $this;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
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

    public function getVenue(): User
    {
        return $this->venue;
    }

    public function setVenue(User $venue): self
    {
        $this->venue = $venue;
        return $this;
    }
}
