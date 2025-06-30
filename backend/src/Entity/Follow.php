<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\FollowRepository;

#[ORM\Entity(repositoryClass: FollowRepository::class)]
#[ORM\Table(name: 'follows')]
#[ORM\UniqueConstraint(name: 'unique_follower_following', columns: ['follower_id', 'following_id'])]
class Follow
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    // Quem segue
    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private User $follower;

    // Quem está sendo seguido
    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private User $following;

    #[ORM\Column(type: 'datetime_immutable')]
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
