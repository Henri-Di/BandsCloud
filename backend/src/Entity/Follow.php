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
use App\Repository\FollowRepository;

#[ORM\Entity(repositoryClass: FollowRepository::class)]
#[ORM\Table(name: 'follows')]
#[ORM\UniqueConstraint(name: 'unique_follower_following', columns: ['follower_id', 'following_id'])]
#[ApiResource(
    normalizationContext: ['groups' => ['follow:list', 'follow:item']],
    denormalizationContext: ['groups' => ['follow:write']],
    operations: [
        new GetCollection(), // GET /follows
        new Get(),           // GET /follows/{id}
        new Post(),          // POST /follows
        new Put(),           // PUT /follows/{id}
        new Delete(),        // DELETE /follows/{id}
    ],
    order: ['followedAt' => 'DESC'],
)]
class Follow
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['follow:list', 'follow:item'])]
    private ?int $id = null;

    // Quem segue
    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    #[Groups(['follow:list', 'follow:item', 'follow:write'])]
    private User $follower;

    // Quem está sendo seguido
    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    #[Groups(['follow:list', 'follow:item', 'follow:write'])]
    private User $following;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(['follow:list', 'follow:item'])]
    private \DateTimeImmutable $followedAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFollower(): User
    {
        return $this->follower;
    }

    public function setFollower(User $follower): self
    {
        $this->follower = $follower;
        return $this;
    }

    public function getFollowing(): User
    {
        return $this->following;
    }

    public function setFollowing(User $following): self
    {
        $this->following = $following;
        return $this;
    }

    public function getFollowedAt(): \DateTimeImmutable
    {
        return $this->followedAt;
    }

    public function setFollowedAt(\DateTimeImmutable $followedAt): self
    {
        $this->followedAt = $followedAt;
        return $this;
    }
}
