<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;

use App\Entity\User;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: "App\Repository\InvitationRepository")]
#[ORM\Table(name: "invitations")]
#[ApiResource(
    normalizationContext: ['groups' => ['invitation:list', 'invitation:item']],
    denormalizationContext: ['groups' => ['invitation:write']],
    operations: [
        new GetCollection(), // GET /invitations
        new Get(),           // GET /invitations/{id}
        new Post(),          // POST /invitations
        new Put(),           // PUT /invitations/{id}
        new Delete(),        // DELETE /invitations/{id}
    ],
    order: ['createdAt' => 'DESC'],
)]
class Invitation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type:"integer")]
    #[Groups(['invitation:list', 'invitation:item'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['invitation:list', 'invitation:item', 'invitation:write'])]
    private ?User $venue = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['invitation:list', 'invitation:item', 'invitation:write'])]
    private ?User $artist = null;

    #[ORM\Column(type:"string", length:20)]
    #[Groups(['invitation:list', 'invitation:item', 'invitation:write'])]
    private string $status = 'pending';

    #[ORM\Column(type:"datetime")]
    #[Groups(['invitation:list', 'invitation:item'])]
    private \DateTimeInterface $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    // Getters e setters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getVenue(): ?User
    {
        return $this->venue;
    }

    public function setVenue(User $venue): self
    {
        $this->venue = $venue;
        return $this;
    }

    public function getArtist(): ?User
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
        $allowed = ['pending', 'accepted', 'rejected'];
        if (!in_array($status, $allowed, true)) {
            throw new \InvalidArgumentException("Invalid status");
        }
        $this->status = $status;
        return $this;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }
}
